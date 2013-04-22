var Logger = require('../Logger');

JSClassParser = (function(){
	'use strict';
	
	var fs = {};
	var esprima = {};
	var JSClassASTAnalyzer = {};
	
	function JSClassParserConstructor(fileLocation)
	{
		this.fileLocation = fileLocation;
	}

	JSClassParserConstructor.injectDependencies = function(FS, ESPRIMA, JSCLASSASTANALYZER)
	{
		fs = FS, esprima = ESPRIMA, JSClassASTAnalyzer = JSCLASSASTANALYZER;
	};

	var JSClassParser = JSClassParserConstructor.prototype;
	
	JSClassParser.getFileLocation = function()
	{
		return this.fileLocation;
	};

	JSClassParser.parseClass = function(jsClass, jsNamespace, className)
	{
		this.jsClass = jsClass;
		this.className = className;
		this.jsNamespace = jsNamespace;
		
		fs.readFile(this.fileLocation, this.classRead.bind(this));
	};

	JSClassParser.classRead = function(error, data)
	{
		if(error)
		{
			Logger.logError('Error while trying to read the javascript file (%s).', error, [this.fileLocation]);
		}
		else
		{
			var classStructure = esprima.parse(data);
			var jsClassASTAnalyzer = new JSClassASTAnalyzer(this.jsClass);
			jsClassASTAnalyzer.extractClassInformation(classStructure);
			
			//console.log(JSON.stringify(esprima.parse(data), null, 4));
			
			this.jsNamespace.classResolved(this.className, this.jsClass);
		}
	};
	
	return JSClassParserConstructor;
})();

module.exports = JSClassParser;