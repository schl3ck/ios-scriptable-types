/* eslint-disable no-console */

// this is the key for the long documentation
const longDocKey = "!scriptable.description";



const fs = require("fs");
const path = require("path");
const axios = require("axios");
const turndown = require("turndown");
const cc = require("console-control-strings");

const ignoreFunctionsWithoutType = require("./ignoreFunctionsWithoutType");


const outputFilename = "dist/scriptable.d.ts";
const templateFile = "template.d.ts";

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

console.log("Loading JSON file...");

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

request.get("/scriptable.json")
	.catch((err) => {
		console.error("There was an error while loading the Tern definition file:\n", err);
		process.exit(1);
	})
	.then((response) => {
		response = response.data;

		let symbols = Object.entries(response).filter((k) => k[0] !== "define" && k[0] !== "details" && !k[0].startsWith("!"));

		let topLevelSymbols = {};

		// save all defined classes & variables
		for (const [symbol, symbolData] of symbols) {
			let struct = topLevelSymbols[symbol] = {
				type: symbol[0] == symbol[0].toUpperCase() ? "class" : "var",
				shortDoc: symbolData["!doc"],
				longDoc: symbolData[longDocKey],
				url: symbolData["!url"],
				definition: (symbolData["!type"] || "").replace("fn", "constructor").replace(/ -> \+.*$/, ""),
				properties: {},
				functions: {}
			};

			for (const [prop, propData] of Object.entries(symbolData)) {
				if (/!doc|!url|!type/.test(prop) || prop === longDocKey) continue;
				struct[(propData["!type"] || "").includes("fn") ? "functions" : "properties"][prop] = {
					shortDoc: propData["!doc"],
					longDoc: propData[longDocKey],
					url: propData["!url"],
					definition: propData["!type"] || ""
				};
			}
		}

		// add all global functions or whatever is inside of "indexEntries" and "details"...
		for (const entry of response.indexEntries) {
			let details = response.details.find((i) => i.id === entry.pageEntryId);
			topLevelSymbols[entry.title] = {
				type: details.headline.toLowerCase(),
				shortDoc: entry.summary,
				longDoc: details.description,
				url: details.url,
				definition: details.decleration || ""
			};
		}

		// process content of "!define"
		for (const [symbol, symbolData] of Object.entries(response["!define"])) {
			let struct = topLevelSymbols[symbol];
			for (const [prop, propData] of Object.entries(symbolData)) {
				struct[(propData["!type"] || "").includes("fn") ? "functions" : "properties"][prop] = {
					shortDoc: propData["!doc"],
					longDoc: propData[longDocKey],
					url: propData["!url"],
					definition: propData["!type"] || ""
				};
			}
		}




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

		// for each symbol
		{
			// return;
			current && current.description.length && structure.properties.push(current);

			let str = "";

			if (structure.description) {
				str += processDescription(structure, structure, { checkForInterface: false, extractDefinition: structure.isGlobal });
			}
			if (!structure.isGlobal) {
				// if it is not a class, it has to be a global variable with a custom object as type
				str += "declare " + (structure.isClass ? "class" : "var") + " " + structure.title + (structure.isClass ? "" : ":") + " {\n";
				str += structure.properties.map((prop) => {
					return processDescription(prop, structure, { checkForInterface: true, extractDefinition: true });
				})
					.join("\n\n")
					.replace(/^/gm, "\t");
				str += "\n}\n";

				if (structure.interfaces.length) {
					let ints = `declare namespace ${structure.title} {
${structure.interfaces.map((i) => `declare interface ${i.name} ${i.content}`).join("\n").replace(/^/gm, "\t")}
}

`;
					str = ints + str;
				}
			}

			definitions.push(str);
		}

		// adding globals that are not in the documentation
		const globals = require("./globals");
		let processedGlobals = [];
		Object.entries(globals).forEach(([key, gl], globalNumber, globals) => {
			logStatus(`Processing global ${globalNumber + 1}/${globals.length}`, true);

			if ("aliasFor" in gl) {
				let parts = gl.aliasFor.split(".");
				const regexFirstPart = new RegExp(String.raw`^declare (?:class|interface|function|var) ${parts[0]}\b`, "m");
				let definition = definitions.find((def) => regexFirstPart.test(def));
				let exportType = definition.match(/^declare (class|interface|function|var) [^\n]+/m);
				if (exportType[1] === "class" || exportType[1] === "interface" || (exportType[1] === "var" && exportType[0].includes(":") && exportType[0].endsWith("{"))) {
					const regexSecondPart = new RegExp(String.raw`^(?:static )?${parts[1]}\b`, "m");
					definition = definition.replace(/^\s+/gm, "").split("/**");
					definition = definition.find((def) => regexSecondPart.test(def));
					definition = "/**" + definition;
					definition = definition.replace(/^static /m, "");
					let isFunction = new RegExp(String.raw`^${parts[1]}\([^)]*\):?`, "m").test(definition);
					definition = definition.replace(new RegExp(String.raw`^${parts[1]}\b`, "m"), `declare ${isFunction ? "function" : "var"} $&`);
				}

				definition = definition.replace(new RegExp(String.raw`^(declare (?:function|var) )${parts[1] || parts[0]}\b`, "m"), `$1${key}`);
				processedGlobals.push(definition);
			} else {
				let description = gl.description;

				if (gl.parameters && gl.parameters.length) {
					description += "\n" + gl.parameters.map((param) => `@param {${param.type}} ${param.name} - ${param.description}`).join("\n");
				}
				if (gl.returns && gl.returns.type) {
					description += `\n@returns {${gl.returns.type}} ${gl.returns.description}`;
				}

				processedGlobals.push(`/**
${description.replace(/^/gm, " * ")}
 */
declare ${gl.definition}
`);
			}
		});

		processedGlobals.forEach((i) => definitions.push(i));

		// load template file
		let template = fs.readFileSync(templateFile);

		let contents = template + "\n" + definitions.join("\n\n\n");

		if (outputFilename.includes("/")) {
			fs.mkdirSync(path.dirname(outputFilename), { recursive: true });
		}

		fs.writeFileSync(outputFilename, contents);
		logStatus("\nDONE\n\n", true);
	});


function convertURL(url) {
	let query = url.match(/^scriptable:\/\/docs\?(.*)$/)[1].split("&");
	let bridge, method;
	for (const part of query) {
		let parts = part.split("=");
		switch (parts[0]) {
			case "bridgeName":
				bridge = parts[1];
				break;
			case "methodName":
				method = parts[1];
				break;
		}
	}
	return `https://docs.scriptable.app/${bridge}/#${method}`;
}

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
		const regexFilterCodeDefinition = new RegExp(String.raw`^(?:static )?${obj.title}(?:(\([^)]*\))|:){1,2}`, "m");
		code = obj.description.filter((item) => item.type === "code");
		codeLength = code.length;
		code = code.find((i) => regexFilterCodeDefinition.test(i.value.text));
		obj.description.splice(obj.description.indexOf(code), 1);
		code = code.value.text;

		// add "void" type to functions that don't have a type, excluding all functions defined in file "ignoreFunctionsWithoutType.js"
		let ignore = ignoreFunctionsWithoutType
			.filter((i) => !i.includes(".") || i.split(".", 2)[0] === structure.title)
			.map((i) => i.split(".", 2).pop());
		if (!ignore.includes("*")) {
			let regex = String.raw`(?<!${ignore.map((i) => "\\b" + i).join("|")})\([^)]*\)$`;
			code = code.replace(new RegExp(regex, "m"), "$&: void");
		}

		if (structure.isGlobal) {
			// prefix "export [function|var]"
			let isFunction = new RegExp(String.raw`^(?:static )?${obj.title}\([^)]*\):?`, "m").test(code);
			code = `declare ${isFunction ? "function" : "var"} ${code}`;
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
	} else {
		// replace "{string: string}" with correct typescript definition
		code = code.replace(/\{string: string\}/, "{[key: string]: string}");
		descr = descr.replace(/\{string: string\}/g, "{[key: string]: string}");
	}

	return `/**
${descr}
 */
${code.replace(/(?<!\{)\[([^\]]+)\]/g, "$1[]")}`
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

