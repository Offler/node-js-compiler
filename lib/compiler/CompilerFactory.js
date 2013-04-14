var fs = require('fs');
var path = require('path');
var esprima = require('esprima');

var Compiler = require('./Compiler');
var JSClass = require('./resources/js/JSClass');
var JSClassParser = require('./parser/JSClassParser');
var JSNamespace = require('./resources/js/JSNamespace');
var DirectoryScanner = require('./filesystem/DirectoryScanner');
var JSResourceRegistry = require('./registry/JSResourceRegistry');

CompilerFactory = (function(){
	'use strict';
	
	function CompilerFactory(){}
	
	CompilerFactory.createCompiler = function(compilerConfiguration)
	{
		this._injectDependencies();
		
		var jsResourceRegistry = new JSResourceRegistry();
		var directoryScanner = new DirectoryScanner(jsResourceRegistry);

		return new Compiler(compilerConfiguration, directoryScanner, jsResourceRegistry);
	};

	CompilerFactory._injectDependencies = function()
	{
		Compiler.injectDependencies(esprima);
		JSClass.injectDependencies(JSClassParser);
		JSClassParser.injectDependencies(fs, esprima);
		JSNamespace.injectDependencies(fs, path, JSClass);
		DirectoryScanner.injectDependencies(fs, path, JSNamespace);
	};

	return CompilerFactory;
})();

module.exports = CompilerFactory;