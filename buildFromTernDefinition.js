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

const outputFilenames = {
	typings: "dist/scriptable.d.ts",
	eslintGlobals: "dist/eslintrc.json"
};
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
		console.log("Building definition file...");
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
		 * @property {string} [interface] 
		 */
		/**
		 * @typedef {object} TopLevelSymbolExtension
		 * @property {"class" | "var" | "function" | "namespace"} type 
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
				 * @type {"class" | "var" | "function"}
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
			let str = "";
			let interfaces = [];
			str += processDescription(symbol, { checkForInterface: true, emitParameters: false }) + "\n";
			if (symbol.interface) interfaces.push(symbol.interface);

			const props = [...Object.values(symbol.properties), symbol.definition.length ? symbol : {}, ...Object.values(symbol.functions)].filter((prop) => Object.getOwnPropertyNames(prop).length);
			// check if it only contains static methods/properties
			if (symbol.type === "class" &&
				props.every(/** @param {NestedSymbol} p */(p) => p.definition.startsWith("static "))
			) {
				if (props.every(/** @param {NestedSymbol} p */(p) => new RegExp(String.raw`\b${symbol.name}\b`, "g").test(p.definition))) {
					// special treatment, as this is class has only static methods, but is used also as type
					str += `declare class ${symbol.name} {}\n\n`;
					symbol.type = "namespace";
					// TODO: test this
				} else {
					symbol.type = "var";
				}
			}

			str += `declare ${symbol.type}`;
			if (symbol.type === "function") {
				str += ` ${symbol.definition};\n`;
			} else {
				str += ` ${symbol.name}${symbol.type === "var" ? ":" : ""} {\n`;
				str += props.map(
					/**
					 * @param {NestedSymbol} prop 
					 */
					(prop) => {
						let str = processDescription(prop, { checkForInterface: true, parent: symbol.name });
						if (prop.interface) interfaces.push(prop.interface);
						if (prop.definition.startsWith("static ")) {
							if (symbol.type === "var")
								prop.definition = prop.definition.replace(/^static /i, "");
							else if (symbol.type === "namespace")
								prop.definition = prop.definition.replace(/^static(?= )/i, /^static \w+\(.*?\): /.test(prop.definition) ? "function" : "var");
						}
						return `${str}\n${prop.definition};`;
					})
					.join("\n\n")
					.replace(/^/gm, "\t");
				// add } and if it is a var, also a ;
				str += `\n}${symbol.type === "var" ? ";" : ""}\n`;
			}

			if (interfaces.length) {
				let ints = `declare namespace ${symbol.name} {
${interfaces.map((i) => `interface ${i}`).join("\n").replace(/^/gm, "\t")}
}

`;
				str = ints + str;
			}

			definitions.push(str);
		}

		// load template file
		let template = fs.readFileSync(templateFile);

		let contents = template + "\n" + definitions.join("\n");

		if (outputFilenames.typings.includes("/")) {
			fs.mkdirSync(path.dirname(outputFilenames.typings), { recursive: true });
		}

		fs.writeFileSync(outputFilenames.typings, contents);

		// eslint globals ======================================

		let eslintConfig = {
			"env": {
				"es2020": true
			},
			"parserOptions": {
				"globalReturn": true,
				"impliedStrict": true
			},
			"globals": {}
		};
		let eslintSymbols = Object.keys(topLevelSymbols);
		eslintSymbols.push("await");
		eslintSymbols.sort();
		for (let symbol of eslintSymbols) {
			eslintConfig.globals[symbol] = "readonly";
		}
		contents = JSON.stringify(eslintConfig, null, 4);

		if (outputFilenames.eslintGlobals.includes("/")) {
			fs.mkdirSync(path.dirname(outputFilenames.eslintGlobals), { recursive: true });
		}

		fs.writeFileSync(outputFilenames.eslintGlobals, contents);

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
		.replace(/\+/g, "")										// remove + infront of +Alert which means it is an instance
		.replace(/^(?!fn\().+$/i, `${name}: $&`)				// add name for simple properties
		.replace(/^fn\((?:[^-]|-[^>])*\)(?! -> )$/, "$& -> void")	// add void return type for functions that don't return anything
		.replace(/(?<=^fn\().+(?=\) -> .+$)/, function(match) {
			let argCount = 0;
			return match
				.replace(/(?<=^|, )(?:\w+|\[\w+\]|\{string: (?:string|any)\})(?=,|$)/g, (match) => `arg${argCount++}: ${match}`)	// add function argument names to arguments that don't have a name
				.replace(/fn\((.*?)\)/g, "($1) => void");	// replace callbacks inside functions (maybe recursive?)
		})
		.replace(/^fn\(/, funcRepl)								// replace function
		.replace(/^(constructor\(.*\)) -> .+$/, "$1")			// remove return type from constructor
		.replace(" -> ", ": ")									// replace Tern function return type with TypeScript's
		.replace(/(?<!Promise)\[([^\]]+)\]/g, "$1[]")			// replace array definition
		.replace(/Promise\[:t=(.+)\]/g, "Promise<$1>")			// replace Promise type
		.replace(/Promise(?!<)/g, "Promise<void>")				// add void type to promise to generate valid TypeScript, but state that it doesn't carry a value
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
 * @param {object[]} obj.parameters 
 * @param {string} obj.parameters[].name 
 * @param {string} obj.parameters[].doc 
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
		let lists = descr.match(/(\n\s*-\s+[^\n]+)+/g);
		let firstList = null;
		for (const [i, list] of lists.entries()) {
			const items = list.trim().replace(/(^|\n)-\s+/g, "$1").split("\n").map((s) => s.trim());
			descr = descr.replace(list, `<ul>${items.map((s) => `<li>${s}</li>`).join("\n")}</ul>`);
			if (i === 0) firstList = items;
		}
		if (/: string/.test(obj.definition) && lists.length === 1) {
			obj.definition = obj.definition.replace(/: string/, ": " + firstList.map((s) => `"${s}"`).join(" | "));
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
	descr = turndownService.turndown(descr).replace(/\\\\n/g, "");

	if (options.emitParameters && obj.parameters && obj.parameters.length) {
		descr += "\n" + obj.parameters.map((i) => `@param ${i.name} - ${turndownService.turndown(i.doc)}`).join("\n");
		// check for optional parameters
		obj.parameters.map((p) => {
			let defaults = /defaults to \S+/i.test(p.doc);
			if (p.doc.startsWith("Optional") || defaults) {
				obj.definition = obj.definition.replace(new RegExp(String.raw`\b${p.name}:`), p.name + "?:");
			}
		});
	}
	if (obj.returns && obj.returns.type) {
		descr += `\n@returns {${obj.returns.type}} ${obj.returns.doc}`;
	}
	if (obj.url) {
		descr += `\n@see ${obj.url}`;
	}

	descr = descr.replace(/^[^\n]{180,}/gm, (match) => {
		let res = "";
		while (match.length > 180) {
			let indexWs = 180;
			for (; indexWs > 0; indexWs--) {
				if (match[indexWs] === " " || match[indexWs] === "\t") break;
			}
			if (indexWs === 0) {
				// there was no whitespace => break at 180 characters
				indexWs = 179;
			}
			// break after the whitespace
			indexWs++;
			res += match.substring(0, indexWs) + "\n";
			match = match.substring(indexWs);
		}
		return res + match;
	});
	descr = descr.replace(/^/gm, " * ");

	// if (/\* \*/.test(descr)) {
	// 	console.log(structure.title, ".", obj.title, "\n", descr, "\n\n");
	// }

	let interfaceName = "";
	let interfaceAnyType = false;

	if (options.checkForInterface && obj.longDoc.includes("the following form")) {
		let example = obj.longDoc.match(/<code>\s*(\{.*?\})\s*<\/code>/s);
		if (!example) {
			const str = "Description included \"the following form\", but the RegEx couldn't find a code example. Symbol: " +
				(options.parent ? options.parent + "." : "") + obj.name + "\nDescription:\n" + obj.longDoc;
			console.error(str);
			throw new Error(str);
		}
		example = example[1];
		let optionalOrRequiredKeys = [];
		let keysAreRequired = null;
		let keyMatch = obj.longDoc.match(/\bEach value in the array must have the "([^"]+)" key. The other keys are optional\b/);
		if (keyMatch) {
			optionalOrRequiredKeys.push(keyMatch[1]);
			keysAreRequired = true;
		} else {
			keyMatch = obj.longDoc.match(/\bThe "([^"]+)" key is optional\b/);
			if (keyMatch) {
				optionalOrRequiredKeys.push(keyMatch[1]);
				keysAreRequired = false;
			}
		}
		let types = [];
		let interf = JSON.stringify(JSON.parse(example), (k, v) => {
			if (!k)
				return v;
			let t = typeof (v == null ? "" : v);
			!types.includes(t) && types.push(t);
			return t;
		}, "\t").replace(/"(\w+)"(:\s*)"([a-zA-Z]+)",?/g, (match, p1, p2, p3) => {
			let optional =
				keysAreRequired === true ?
					!optionalOrRequiredKeys.includes(p1) :
					keysAreRequired === false ?
						optionalOrRequiredKeys.includes(p1) :
						false;
			return p1 + (optional ? "?" : "") + p2 + p3 + ";";
		});
		interfaceName = obj.name[0].toUpperCase() + obj.name.substring(1);
		interfaceAnyType = types.length > 1;
		obj.interface = interfaceName + " " + interf;
	}

	if (interfaceName) {
		obj.definition = obj.definition.replace(interfaceAnyType ? /\bany\b/ : /\{string: \b.*?\b\}/, (options.parent ? options.parent + "." : "") + interfaceName);
	} else {
		// replace "{string: string}" with correct typescript definition
		obj.definition = obj.definition.replace(/\{string: (.+)\}(\[\])?/, (match, p1, p2) => {
			let res = `{ [key: string]: ${p1} }`;
			if (p2) {
				res = `Array<${res}>`;
			}
			return res;
		});
		descr = descr.replace(/\{string: (.+)\}/, "{ [key: string]: $1 }");
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

