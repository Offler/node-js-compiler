
Compiler = (function(){
	'use strict';
	
	var esprima = {};
	
	function CompilerConstructor(compilerConfiguration, directoryScanner, jsResourceRegistry)
	{
		this.directoryScanner = directoryScanner;
		this.jsResourceRegistry = jsResourceRegistry;
		this.compilerConfiguration = compilerConfiguration;
	}

	CompilerConstructor.injectDependencies = function(ESPRIMA)
	{
		esprima = ESPRIMA;
	};
	
	var Compiler = CompilerConstructor.prototype;
	
	Compiler.compile = function()
	{
		this.jsResourceRegistry.addResourcesResolvedListener(this);
		
		this.directoryScanner.scanSource('src');
	};

	Compiler.resourcesResolved = function()
	{
		console.log(JSON.stringify(esprima.parse('class TestClass {}'), null, 4));
	};
	
	return CompilerConstructor;
})();

module.exports = Compiler;