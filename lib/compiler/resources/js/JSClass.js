
JSClass = (function(){
	'use strict';
	
	var JSClassParser = {};
	
	//className actually ends with '.js', do we want file name or class name?
	function JSClassConstructor(className, fileLocation)
	{
		this.className = className;
		this.jsClassParser = new JSClassParser(fileLocation);
	}

	JSClassConstructor.injectDependencies = function(JSCLASSPARSER)
	{
		JSClassParser = JSCLASSPARSER;
	};

	var JSClass = JSClassConstructor.prototype;

	JSClass.resolveClass = function(jsNamespace)
	{
		this.jsClassParser.parseClass(this, jsNamespace, this.className);
	};
	
	return JSClassConstructor;
})();

module.exports = JSClass;