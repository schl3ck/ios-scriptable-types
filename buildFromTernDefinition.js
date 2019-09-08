/* eslint-disable no-console */

// this is the key for the long documentation
const longDocKey = "!scriptable.description";
const functionParameters = {
	key: "!scriptable.parameters",
	name: "!scriptable.name",
	description: "!scriptable.description"
};

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const turndown = require("turndown");
const cc = require("console-control-strings");

const outputFilename = "dist/scriptable.d.ts";
const templateFile = "template.d.ts";

let turndownService = new turndown({
	codeBlockStyle: "indented",
	br: "\n"
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

		let symbols = Object.entries(response).filter((k) => !k[0].startsWith("!"));

		/**
		 * @typedef {object} NestedSymbol
		 * @property {string | undefined} shortDoc 
		 * @property {string | undefined} longDoc 
		 * @property {string} url 
		 * @property {string} definition 
		 * @property {string} name 
		 * @property {object[]} parameters 
		 * @property {string} parameters[].name 
		 * @property {string} parameters[].doc 
		 */
		/**
		 * @typedef {object} TopLevelSymbolExtension
		 * @property {"class" | "var" | "function"} type 
		 * @property {{[key: string]: NestedSymbol}} properties 
		 * @property {{[key: string]: NestedSymbol}} functions
		 */
		/**
		 * @typedef {NestedSymbol | TopLevelSymbolExtension} TopLevelSymbol
		 */
		/**
		 * @type {{[key: string]: TopLevelSymbol}}
		 */
		let topLevelSymbols = {};

		// save all defined classes & variables
		for (const [symbol, symbolData] of symbols) {
			let struct = topLevelSymbols[symbol] = {
				/**
				 * @type {"class" | "var" | "fucntion"}
				 */
				type: symbol[0] == symbol[0].toUpperCase() ? "class" : "var",
				shortDoc: symbolData["!doc"],
				longDoc: symbolData[longDocKey],
				url: symbolData["!url"],
				definition: processType(symbolData["!type"], symbol, { mayBeCtor: true }),
				parameters: (symbolData[functionParameters.key] || []).map((param) => {
					return {
						name: param[functionParameters.name],
						doc: param[functionParameters.description]
					};
				}),
				properties: {},
				functions: {},
				name: symbol
			};
			if (struct.type === "var" && struct.definition.includes("(")) {
				struct.type = "function";
			}

			for (const [prop, propData] of Object.entries(symbolData)) {
				if (/!doc|!url|!type/.test(prop) || prop === longDocKey || prop === functionParameters.key) continue;
				struct[(propData["!type"] || "").includes("fn") ? "functions" : "properties"]["+" + prop] = {
					shortDoc: propData["!doc"],
					longDoc: propData[longDocKey],
					url: propData["!url"],
					definition: processType(propData["!type"], prop, { static: true }),
					parameters: (propData[functionParameters.key] || []).map((param) => {
						return {
							name: param[functionParameters.name],
							doc: param[functionParameters.description]
						};
					}),
					name: prop
				};
			}
		}

		// process content of "!define"
		for (const [symbol, symbolData] of Object.entries(response["!define"])) {
			let struct = topLevelSymbols[symbol];
			for (const [prop, propData] of Object.entries(symbolData)) {
				struct[(propData["!type"] || "").includes("fn") ? "functions" : "properties"][prop] = {
					shortDoc: propData["!doc"],
					longDoc: propData[longDocKey],
					url: propData["!url"],
					definition: processType(propData["!type"], prop),
					parameters: (propData[functionParameters.key] || []).map((param) => {
						return {
							name: param[functionParameters.name],
							doc: param[functionParameters.description]
						};
					}),
					name: prop
				};
			}
		}

		// (function() {})();

		for (const symbol of Object.values(topLevelSymbols)) {
			let interfaces = [];
			let str = "";
			str += processDescription(symbol, { checkForInterface: true, emitParameters: false }) + "\n";
			if (symbol.interface) interfaces.push(symbol.interface);
			// if it is not a class, it has to be a global variable with a custom object as type
			str += `declare ${symbol.type}`;
			if (symbol.type === "function") {
				str += ` ${symbol.definition}`;
			} else {
				str += ` ${symbol.name}${symbol.type === "var" ? ":" : ""} {\n`;
				const props = [...Object.values(symbol.properties), symbol.definition.length ? symbol : {}, ...Object.values(symbol.functions)].filter((prop) => Object.getOwnPropertyNames(prop).length);
				str += props.map((prop) => {
					let str = processDescription(prop, { checkForInterface: true, parent: symbol.name });
					if (prop.interface) interfaces.push(prop.interface);
					return `${str}\n${prop.definition}`;
				})
					.join("\n\n")
					.replace(/^/gm, "\t");
				str += "\n}\n";
			}

			if (interfaces.length) {
				let ints = `declare namespace ${symbol.name} {
${interfaces.map((i) => `declare interface ${i}`).join("\n").replace(/^/gm, "\t")}
}

`;
				str = ints + str;
			}

			definitions.push(str);
		}

		// load template file
		let template = fs.readFileSync(templateFile);

		let contents = template + "\n" + definitions.join("\n\n\n");

		if (outputFilename.includes("/")) {
			fs.mkdirSync(path.dirname(outputFilename), { recursive: true });
		}

		fs.writeFileSync(outputFilename, contents);
		logStatus("\nDONE\n\n", true);
	});


/**
 * 
 * @param {string|undefined} type The type to process
 * @param {string} name The name of the current type
 * @param {object} options Some options
 * @param {boolean} options.mayBeCtor If it is a function, it will be treated as a constructor if it returns "+name"
 * @param {boolean} options.static If it is a function, it gets the _static_ keyword prepended
 */
function processType(type, name, options = {}) {
	type = type || "";
	let funcRepl = name + "(";
	if (options.static) funcRepl = "static " + funcRepl;
	if (options.mayBeCtor && new RegExp(" -> \\+" + name).test(type)) funcRepl = "constructor(";
	// type = type
	return type
		.replace(/\+/g, "")									// remove + infront of +Alert which means it is an instance
		.replace(/^(?!fn\().+$/i, `${name}: $&`)			// add name for simple properties
		.replace(/^fn\(.*\)(?! -> )/, "$& -> void")			// add void return type for functions that don't return anything
		.replace(/^fn\(/, funcRepl)							// replace function
		.replace(/^(constructor\(.*\)) -> .+$/, "$1")		// remove return type from constructor
		.replace(" -> ", ": ")								// replace Tern function return type with TypeScript's
		.replace(/(?<!Promise)\[([^\]]+)\]/g, "$1[]")		// replace array definition
		.replace(/Promise\[:t=(.+)\]/g, "Promise<$1>")		// replace Promise type
		.replace(/Promise(?!<)/g, "Promise<void>")			// add void type to promise to generate valid TypeScript, but state that it doesn't carry a value
		.replace(/^((?:atob|btoa)\(.*\): )void$/, "$1string")	// set return type of atob() and btoa() to string if they are set to void because of the missing return type replacement earlier
		.replace(/\bbool\b/g, "boolean");
}

/**
 * Processes the description of `obj`
 * @param {object} obj The object from which the description should be processed
 * @param {string} obj.shortDoc 
 * @param {string} obj.longDoc 
 * @param {string} obj.type 
 * @param {string} obj.definition 
 * @param {string} obj.url 
 * @param {string} obj.name 
 * @param {string} obj.interface This will contain the type definition of the interface if one was found
 * @param {object} [options] Some options
 * @param {boolean} [options.checkForInterface] If the code blocks in the description should be checked for a possible interface
 * @param {string} [options.parent] Name of parent if there is one
 * @param {boolean} [options.emitParameters] If the found parameters should be added to the JSDoc
 */
function processDescription(obj, options) {
	function checkOptions(prop, def) {
		if (!(prop in options)) options[prop] = def;
	}
	if (!options) options = {};
	checkOptions("checkForInterface", true);
	checkOptions("parent", "");
	checkOptions("emitParameters", true);

	if (obj.shortDoc && obj.shortDoc.startsWith("!prop_fn ") && /\(.*\)(: )?(?!.*\).*$)/.test(obj.definition)) {
		// we got a property that is not a function but a property that holds a function object
		obj.definition = obj.definition
			.replace(/\)$/, "): void")					// add any type to these without any return type
			.replace(/\): (?!.*\).*$)/, ") => ")		// foo(bar: string): boolean     =>   foo(bar: string) => boolean
			.replace(/^[^(]+/, "$&: ");					// foo(bar: string) => boolean   =>   foo: (bar: string) => boolean

		obj.shortDoc = obj.shortDoc.replace(/^!prop_fn /, "");
	}

	if (!obj.shortDoc || obj.shortDoc === obj.longDoc) obj.shortDoc = "";
	if (!obj.longDoc) obj.longDoc = "";

	let descr = ("<em>" + obj.shortDoc + "</em>\n\n").replace("<em></em>\n\n", "");
	// find code blocks that contain at least one space and surround them with <pre></pre>
	// one space because inline code usually doesn't include a space
	descr += obj.longDoc
		.replace(/<code>(?:[^<]|<[^/]|<\/[^c]|<\/c[^o]|<\/co[^d]|<\/cod[^e]|<\/code[^>])+(\s+(?:[^<]|<[^/]|<\/[^c]|<\/c[^o]|<\/co[^d]|<\/cod[^e]|<\/code[^>])*)+<\/code>/g, "<pre>$&</pre>");
	/* to understand that regex:
		search for <code>
		*: search for anything except <
			otherwise search for < and anything except /
			otherwise search for </ and anything except c
			otherwise search for </c and anything except o
			otherwise search for </co and anything except d
			otherwise search for </cod and anything except e
			otherwise search for </code and anything except >
				==> this searches for anything except "</code>" as we only want to include the contents of one code block
			otherwise search for any whitespace
			and repeat at *
		if we encounter "</code>" and there was a space inside, it is a match
	*/

	// convert unordered lists
	if (/(\n\s*-\s+[^\n]+)+/.test(descr)) {
		let list = descr.match(/(\n\s*-\s+\w+)+/);
		list = list && list[0].trim();
		const items = list.replace(/(^|\n)-\s+/g, "$1").split("\n").map((s) => s.trim());
		descr = descr.replace(list, `<ul>${items.map((s) => `<li>${s}</li>`).join("\n")}</ul>`);
		if (/: string/.test(obj.definition) && !items.some((s) => s.includes(" "))) {
			obj.definition = obj.definition.replace(/: string/, ": " + items.map((s) => `"${s}"`).join(" | "));
		}
	}
	// convert ordered lists
	if (/(\n\s*\d+\.\s+[^\n]+)+/.test(descr)) {
		let list = descr.match(/(\n\s*\d+\.\s+[^\n]+)+/);
		list = list && list[0].trim();
		const items = list.replace(/(^|\n)\d+\.\s+/g, "$1").split("\n");
		descr = descr.replace(list, `<ol>${items.map((s) => `<li>${s}</li>`).join("\n")}</ol>`);
	}

	descr = descr.replace(/\n\n/g, "<br>")
		// the following regex works the same as the one above to search for <code> blocks, except it doens't match "</code></pre>" in between and we are looking for "<br>" instead of a space. If we could define subpatterns like in PRCE, then it would look much cleaner...
		.replace(/<pre><code>(?:[^<]|<[^/]|<\/[^c]|<\/c[^o]|<\/co[^d]|<\/cod[^e]|<\/code[^>]|<\/code>[^<]|<\/code><[^/]|<\/code><\/[^p]|<\/code><\/p[^r]|<\/code><\/pr[^e]|<\/code><\/pre[^>])*(?:<br>(?:[^<]|<[^/]|<\/[^c]|<\/c[^o]|<\/co[^d]|<\/cod[^e]|<\/code[^>]|<\/code>[^<]|<\/code><[^/]|<\/code><\/[^p]|<\/code><\/p[^r]|<\/code><\/pr[^e]|<\/code><\/pre[^>])*)+<\/code><\/pre>/g, function(match) {
			return match.replace(/<br>/g, "\n\n");
		});
	descr = turndownService.turndown(descr);

	if (options.emitParameters && obj.parameters && obj.parameters.length) {
		descr += "\n" + obj.parameters.map((i) => `@param ${i.name} - ${i.doc}`).join("\n");
	}
	if (obj.returns && obj.returns.type) {
		descr += `\n@returns {${obj.returns.type}} ${obj.returns.doc}`;
	}
	if (obj.url) {
		descr += `\n@see ${obj.url}`;
	}

	descr = descr.replace(/^/gm, " * ");

	// if (/\* \*/.test(descr)) {
	// 	console.log(structure.title, ".", obj.title, "\n", descr, "\n\n");
	// }

	let interfaceName = "";
	let interfaceAnyType = false;

	if (options.checkForInterface && obj.longDoc.includes("on the following form:")) {
		let example = obj.longDoc.match(/<code>\s*(\{.*?\})\s*<\/code>/s);
		if (!example) {
			const str = "Description included \"on the following form:\", but the RegEx couldn't find a code example. Symbol: " +
				(options.parent ? options.parent + "." : "") + obj.name + "\nDescription:\n" + obj.longDoc;
			console.error(str);
			throw new Error(str);
		}
		example = example[1];
		let types = [];
		let interf = JSON.stringify(JSON.parse(example), (k, v) => {
			if (!k)
				return v;
			let t = typeof (v == null ? "" : v);
			!types.includes(t) && types.push(t);
			return t;
		}, "\t").replace(/(:\s*)"([a-zA-Z]+)"/g, "$1$2");
		interfaceName = obj.name[0].toUpperCase() + obj.name.substring(1);
		interfaceAnyType = types.length > 1;
		obj.interface = interfaceName + " " + interf;
	}

	if (interfaceName) {
		obj.definition = obj.definition.replace(interfaceAnyType ? /\bany\b/ : /\{string: \b.*?\b\}/, (options.parent ? options.parent + "." : "") + interfaceName);
	} else {
		// replace "{string: string}" with correct typescript definition
		obj.definition = obj.definition.replace(/\{string: (.+)\}/, "{[key: string]: $1}");
		descr = descr.replace(/\{string: (.+)\}/, "{[key: string]: $1}");
	}

	return `/**\n${descr}\n */`;
}

/**
 * Logs a status message, optionally overwriting the last printed line
 * @param {string} message - The message to log
 * @param {boolean} updateStatus - True, if it should update the line above the cursor (last printed line)
 */
function logStatus(message, updateStatus) {
	console.log(`${updateStatus ? cc.up(1) + cc.gotoSOL() + cc.eraseLine() : ""}${message}`);
}

