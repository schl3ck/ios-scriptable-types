/* eslint-disable no-console */
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const turndown = require("turndown");
const cc = require("console-control-strings");


const outputFilename = "scriptable.d.ts";
// eslint-disable-next-line no-unused-vars
const regex = {

};

let turndownService = new turndown({
	codeBlockStyle: "indented",
}).remove("button").addRule("strike", {
	filter: ["del", "s", "strike"],
	replacement: (content) => {
		return `~${content}~`;
	}
});

let definitions = [];

let request = axios.create({
	baseURL: "https://docs.scriptable.app/",
	timeout: 15000
});

console.log("Loading main webpage...");

if (!String.prototype.count) {
	Object.defineProperty(String.prototype, "count", {
		enumerable: false,
		value: function(char) {
			let regex = char instanceof RegExp ? char : new RegExp(char.replace(/[/()[\]^$+.?*\\{}|]/g, "\\$&"), "g");
			let match = this && this.match(regex);
			return match && match.length || 0;
		}
	});
}

request.get("/")
	.catch((err) => {
		console.error("There was an error while loading the main page:\n", err);
		process.exit(1);
	})
	.then((response) => {

		let $ = cheerio.load(response.data);
		let links = $("div.md-sidebar--primary[data-md-component='navigation'] ul.md-nav__list a.md-nav__link:not(.md-nav__link--active)").map((i, el) => {
			let l = $(el).attr("href");
			return l.startsWith("#") ? undefined : l;
		}).get();

		console.log(`Loading ${links.length} sub pages...`);

		return Promise.all(
			links.map((link) => {
				return request.get(link).then((response) => cheerio.load(response.data));
			})
		);
	})
	.catch((err) => {
		console.error("There was an error while loading all sub pages:\n", err);
		process.exit(1);
	})
	.then((responses) => {
		console.log(`Processing ${responses.length} subpages...`);
		responses.forEach(($, responseNumber) => {
			logStatus(`Processing sub page ${responseNumber + 1}/${responses.length}`, responseNumber > 0);

			let article = $("article.md-content__inner");

			/**
			 * @typedef {object} Description
			 * @property {"text"|"code"} type
			 * @property {object} value
			 * @property {string} value.html
			 * @property {string} value.text
			 */
			/**
			 * @typedef {object} Parameters
			 * @property {string} name
			 * @property {string} type
			 * @property {string} description
			 */
			/**
			 * @typedef {object} Returns
			 * @property {string} type
			 * @property {string} description
			 */
			/**
			 * @typedef {object} CurrentProperty
			 * @property {string} title
			 * @property {Description[]} description
			 * @property {Parameters[]} parameters
			 * @property {Returns} returns
			 * @property {string[]} enum
			 */
			/**
			 * Holds the current property while it is collected
			 * @type {CurrentProperty}
			 */
			let current = {
				description: [],
				parameters: [],
				returns: {},
				enum: []
			};

			let structure = {
				title: "",
				/**
				 * @type {Description[]}
				 */
				description: [],
				isClass: true,
				/**
				 * @type {CurrentProperty[]}
				 */
				properties: [],
				interfaces: [],
				isGlobal: false,
				/**
				 * @type {Parameters}
				 */
				parameters: [],
				/**
				 * @type {Returns}
				 */
				returns: {},
				/**
				 * @type {string[]}
				 */
				enum: []
			};

			let skip = false;
			/**
			 * describes in which block the iteration is
			 * @type {"description"|"parameters"|"returns"}
			 */
			let mode = "";
			let isStructureDescription = true;

			let tableOfContents = $("label.md-nav__title[for='__toc'] + ul > li > a:not(:contains('Parameters')):not(:contains('Return value'))");
			structure.isGlobal = tableOfContents.length === 0;

			article.children().each((i, el) => {
				el = $(el);
				let tagName = el[0].tagName.toLowerCase();
				if (tagName === "div") {
					el = el.children(":first-child");
					tagName = el[0].tagName.toLowerCase();
				}
				// strip all non ASCII chars, replace "new ..." with "constructor", remove any "+" or "-" at the beginning
				let text = el.text().replace(/[^ -\u007f]/g, "").replace(/new [^(]+/, "constructor").replace(/^[-+]/, "");
				// construct outerHTML and replace "<pre>...</pre>" with "<pre><code>...</code></pre>"
				const outerHTML = `<${tagName}>${el.html()}</${tagName}>`.replace(/<pre>/g, "$&<code>").replace(/<\/pre>/g, "</code>$&");
				if (skip && tagName !== "h3") return;
				switch (tagName) {
					case "h1":
						structure.title = text;
						structure.isClass = /^[A-Z]/.test(structure.title.trim());
						mode = "description";
						break;
					case "hr":
						current && structure.properties.push(current);
						current = {
							description: [],
							parameters: [],
							returns: {},
							enum: []
						};
						break;
					case (structure.isGlobal ? "thisShouldNeverMatch" : "h2"):
						isStructureDescription = structure.isGlobal;
						current.title = text;
						mode = "description";
						break;
					case (structure.isGlobal ? "h2" : "h3"):
						mode = text.toLowerCase().includes("parameters") ? "parameters" : "returns";
						break;
					case "ul":
						(structure.isGlobal ? structure : current).enum = el.children("li").map((i, el) => $(el).text()).get();
					// FALLTHROUGH!
					case "p":
					case "pre":
						{
							let o;
							switch (mode) {
								case "description":
									o = {
										type: tagName === "pre" ? "code" : "text",
										value: {
											html: outerHTML,
											text: text
												.replace(/fn\([^)]*\)$/gm, "$& -> void")		// convert function type without return value "fn(...)" to "fn(...) -> void"
												.replace(/fn\(([^)]*)\) ->/g, "($1) =>")		// strip "fn" from function type and replace "->" with "=>"
										}
									};
									break;
								case "parameters":
									o = {
										name: el.find("strong").text(),
										type: el.find("em").text(),
										description: text
									};
									o.description = text.replace(o.name, "").replace(o.type, "").trim();
									break;
								case "returns":
									o = {
										type: el.find("em").text(),
										description: text
									};
									o.description = text.replace(o.type, "").trim();
									break;
							}
							if (structure.isGlobal || isStructureDescription) {
								structure[mode].push ? structure[mode].push(o) : (structure[mode] = o);
							} else {
								current[mode].push ? current[mode].push(o) : (current[mode] = o);
							}

							// let tmp = structure.isGlobal ? structure : current;
							// if (o.type === "code" && tmp.description.filter((i) => i.type === "code").length > 1) {
							// 	console.log(`${structure.title}.${current.title}:\n${
							// 		tmp.description
							// 			.filter((i) => i.type === "code" && new RegExp(`^${current.title || structure.title}(?:(\\([^)]*\\))|(:)){1,2}`, "m").test(i.value.text))
							// 			.map((i) => i.value.text)
							// 			.join("\n")
							// 	}\n`);
							// }
						}
						break;
				}
			});
			// return;
			current && current.description.length && structure.properties.push(current);

			let str = "";

			if (structure.description) {
				str += processDescription(structure, structure, { checkForInterface: false, extractDefinition: structure.isGlobal });
			}
			if (!structure.isGlobal) {
				str += "export " + (structure.isClass ? "class" : "interface") + " " + structure.title + " {\n";
				str += structure.properties.map((prop) => {
					return processDescription(prop, structure, { checkForInterface: true, extractDefinition: true });
				})
					.join("\n\n")
					.replace(/^/gm, "\t");
				str += "\n}\n";

				if (structure.interfaces.length) {
					let ints = `export namespace ${structure.title} {
${structure.interfaces.map((i) => `declare interface ${i.name} ${i.content}`).join("\n").replace(/^/gm, "\t")}
}

`;
					str = ints + str;
				}
			}

			definitions.push(str);
		});

		fs.writeFileSync(outputFilename, definitions.join("\n\n\n"));
		logStatus("\nDONE\n\n", true);
	});


/**
 * Processes the description of `obj`
 * @param {object} obj The object from which the description should be processed
 * @param {object} structure The structure object (interface or class) which contains `obj`
 * @param {object} options Some options
 * @param {boolean} options.checkForInterface If the code blocks in the description should be checked for a possible interface
 * @param {boolean} options.extractDefinition If the definition should be extracted from the contained code blocks
 */
function processDescription(obj, structure, options) {
	function checkOptions(prop, def) {
		if (!(prop in options)) options[prop] = def;
	}
	if (!options) options = {};
	checkOptions("checkForInterface", true);
	checkOptions("extractDefinition", true);

	let code, codeLength = 0;
	if (options.extractDefinition) {
		const regexFilterCodeDefinition = new RegExp(`^(?:static )?${obj.title}(?:(\\([^)]*\\))|(:)){1,2}`, "m");
		code = obj.description.filter((item) => item.type === "code");
		codeLength = code.length;
		code = code.find((i) => regexFilterCodeDefinition.test(i.value.text));
		obj.description.splice(obj.description.indexOf(code), 1);
		code = code.value.text;

		// add "void" type to functions that don't have a type
		code = code.replace(/\)$/m, "): void");

		if (structure.isGlobal) {
			// prefix "export [function|var]"
			let isFunction = new RegExp(`^(?:static )?${obj.title}\\([^)]*\\)(:)?`, "m").test(code);
			code = `export ${isFunction ? "function" : "var"} ${code}`;
		}

		if (obj.enum && obj.enum.length && /: string/.test(code)) {
			if (code.count(/: string/g) > 1) {
				logStatus(
					cc.color("yellow") +
					`Warning: multiple occurrences found for regex /: string/ at ${structure.title}${structure.isGlobal ? "" : `.${obj.title}`}\n` +
					cc.color("reset"),
					true
				);
			}
			let enumValues = obj.enum.map((i) => `"${i}"`).join(" | ");
			code = code.replace(/: string/, ": " + enumValues);

			// also replace in JSDoc @param if one would be inserted
			if (obj.parameters && obj.parameters.length) {
				for (let i = 0; i < obj.parameters.length; i++) {
					const param = obj.parameters[i];
					if (param.type === "string") {
						param.type = enumValues;
						break;	// stop after the first occcurrence
					}
				}
			}
		}
	}
	code = code || "";

	let descr = obj
		.description
		.filter((item) => !item.value.text.includes("Deprecated in version") && !item.value.text.includes("DeprecatedVersion "))
		.map((item) =>
			turndownService
				.turndown(item.value.html)
			// .replace(/```(\s+\{)/, "```json$1")
			// .replace(/```(\s+(?!\{))/, "```javascript$1"))
		)
		.join("\n\n");

	let deprecated = obj
		.description
		.filter((item) => item.value.text.includes("Deprecated in version") || item.value.text.includes("DeprecatedVersion "))
		.map((item) => "@deprecated " + turndownService.turndown(item.value.html))
		.join("\n");
	if (deprecated) {
		descr += "\n\n" + deprecated;
	}

	if (obj.parameters && obj.parameters.length) {
		descr += "\n" + obj.parameters.map((i) => `@param {${i.type}} ${i.name} - ${i.description}`).join("\n");
	}
	if (obj.returns && obj.returns.type) {
		descr += `\n@returns {${obj.returns.type}} ${obj.returns.description}`;
	}

	descr = descr
		.replace(/\[email\sprotected\]/g, "my@example.com")
		.replace(/^/gm, " * ");

	// if (/\* \*/.test(descr)) {
	// 	console.log(structure.title, ".", obj.title, "\n", descr, "\n\n");
	// }

	let interfaceName = "";
	let interfaceAnyType = false;

	if (options.checkForInterface && codeLength > 1 && descr.includes("on the following form:")) {
		let i = obj.description.findIndex((item) => item.value.text.includes("on the following form:"));
		// if (prop.description[i].text.includes("array") && /^[a-zA-z_$][a-zA-Z0-9_$]*:/.test(code)) {
		// 	// simple
		// 	// code = code.replace(/(:\s*)(.+)$/, "$1$2[]");
		// 	code = code.split(":");
		// 	//			  (  [  {  <
		// 	let parens = [0, 0, 0, 0];
		// 	let incr = ["(", "[", "{", "<"];
		// 	let decr = [")", "]", "}", ">"];
		// 	let i;
		// 	for (i = 0; i < code.length; i++) {
		// 		const c = code[i];
		// 		incr.forEach((p, i) => c.includes(p) && parens[i]++);
		// 		decr.forEach((p, i) => c.includes(p) && parens[i]--);
		// 		if (parens.every(p => p === 0)) break;
		// 	}
		// 	i < code.length - 1 && i++;
		// 	code[i] = code[i] + "[]";
		// 	code = code.join(":");
		// }
		let types = [];
		let interf = JSON.stringify(JSON.parse(obj.description[i + 1].value.text), (k, v) => {
			if (!k)
				return v;
			let t = typeof (v == null ? "" : v);
			!types.includes(t) && types.push(t);
			return t;
		}, "\t").replace(/(:\s*)"([a-zA-Z]+)"/g, "$1$2");
		interfaceName = obj.title[0].toUpperCase() + obj.title.substring(1);
		interfaceAnyType = types.length > 1;
		structure.interfaces.push({
			name: interfaceName,
			content: interf
		});
	}

	if (interfaceName) {
		code = code.replace(interfaceAnyType ? /\bany\b/ : /\{string: \b.*?\b\}/, structure.title + "." + interfaceName);
	}

	return `/**
${descr}
 */
${code.replace(/\[([^\]]+)\]/g, "$1[]")}`
		.replace(/\bbool\b/gi, "$&ean");
}

/**
 * Logs a status message, optionally overwriting the last printed line
 * @param {string} message - The message to log
 * @param {boolean} updateStatus - True, if it should update the line above the cursor (last printed line)
 */
function logStatus(message, updateStatus) {
	console.log(`${updateStatus ? cc.up(1) + cc.gotoSOL() + cc.eraseLine() : ""}${message}`);
}


// TODO: add global properties
