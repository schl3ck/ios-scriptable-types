/*
	keys of the object should be the name of the global function/variable (only neede for aliases)
	value is object like:
		{
			aliasFor: "someReferenceName"
		}
		when it is just an alias for "someReferenceName", where that can be e.g. "Alert.addAction" or "importModule"

		or

		{
			description: "a JSDoc description (but without the * at the beginning of every line and without parameters and return type)",
			definition: "the TypeScript definition, e.g. function atob(str: string): string",
			parameters: [
				{
					name: "name of the parameter",
					type: "type of the parameter",
					description: "JSDoc description of the parameter"
				},
				...
			],
			returns: {
				type: "type of the return value",
				description: "JSDoc description of the return value"
			}
		}
		for globals that are no aliases for already defined functions/properties/variables
		yes, the types are defined multiple times to ease generation of the definition
		"parameters" and "returns" are optional
*/
module.exports = {
	log: {
		aliasFor: "console.log"
	},
	logWarning: {
		aliasFor: "console.warn"
	},
	logError: {
		aliasFor: "console.error"
	},
	atob: {
		description: "Decodes base64 into a binary string (\"ASCII to binary\")",
		definition: "function atob(str: string): string",
		parameters: [
			{
				name: "str",
				type: "string",
				description: "The string to decode"
			}
		],
		returns: {
			type: "string",
			description: "The decoded binary string"
		}
	},
	btoa: {
		description: "Encodes a binary string as base64 (\"binary to ASCII\")",
		definition: "function btoa(str: string): string",
		parameters: [
			{
				name: "str",
				type: "string",
				description: "The string to encode"
			}
		],
		returns: {
			type: "string",
			description: "The base64 encoded string"
		}
	}
};
