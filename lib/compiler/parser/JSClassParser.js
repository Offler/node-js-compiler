var Logger = require('../Logger');

JSClassParser = (function(){
	'use strict';
	
	var fs = {};
	var esprima = {};
	
	function JSClassParserConstructor(fileLocation)
	{
		this.fileLocation = fileLocation;
	}

	JSClassParserConstructor.injectDependencies = function(FS, ESPRIMA)
	{
		fs = FS, esprima = ESPRIMA;
	};

	var JSClassParser = JSClassParserConstructor.prototype;
	
	JSClassParser.getFileLocation = function()
	{
		return this.fileLocation;
	};

	JSClassParser.parseClass = function()
	{
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
			console.log(JSON.stringify(esprima.parse(data), null, 4));
		}
	};
	
	return JSClassParserConstructor;
})();

module.exports = JSClassParser;