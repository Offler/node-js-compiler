
JSClass = (function(){
	'use strict';
	
	var fs = {};
	var esprima = {};
	
	//className actually ends with '.js', do we want file name or class name?
	function JSClassConstructor(className, fileLocation)
	{
		this.className = className;
		this.fileLocation = fileLocation;
	}

	JSClassConstructor.injectDependencies = function(FS, ESPRIMA)
	{
		fs = FS, esprima = ESPRIMA;
	};

	var JSClass = JSClassConstructor.prototype;
	
	JSClass.getFileLocation = function()
	{
		return this.fileLocation;
	};

	JSClass.parseClass = function()
	{
		fs.readFile(this.fileLocation, this.classRead.bind(this));
	};

	JSClass.classRead = function(error, data)
	{
		console.log(JSON.stringify(esprima.parse(data), null, 4));
	};
	
	return JSClassConstructor;
})();

module.exports = JSClass;