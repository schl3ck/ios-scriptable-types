/*
 specify as:
	function name to ignore them in every class
	ClassName.FunctionName to only ignore it in the specified class
	* to ignore all functions everywhere
	ClassName.* to ignore all functions in the specified class
 
 examples:
	constructor			ignores every constructor function
	Alert.addAction		ignores the function "addAction" in the class "Alert"
 */
module.exports = ["constructor", "importModule"];
