
Compiler = (function(){
	'use strict';
	
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
		
	};
	
	return CompilerConstructor;
})();

module.exports = Compiler;