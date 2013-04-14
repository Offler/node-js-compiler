
JSNamespace = (function(){
	'use strict';
	
	var fs = {};
	var path = {};
	var JSClass = {};
	
	function JSNamespaceConstructor(namespace, namespaceDir)
	{
		this.namespace = namespace;
		this.namespaceDir = namespaceDir;
		
		this.resolvedChildNamespace = {};
		this.registeredChildNamespace = {};
		
		this.resolvedJSClasses = {};
		this.registeredJSClasses = {};
	}
	
	JSNamespaceConstructor.injectDependencies = function(FS, PATH, JSCLASS)
	{
		fs = FS, path = PATH, JSClass = JSCLASS;
	};

	var JSNamespace = JSNamespaceConstructor.prototype;

	JSNamespace.resolveNamespace = function(jsNamespaceParent)
	{
		this.jsNamespaceParent = jsNamespaceParent;
		
		fs.readdir(this.namespaceDir, this.namespaceDirRead.bind(this));
	};
	
	JSNamespace.namespaceDirRead = function(error, files)
	{
		for(var file = 0; file < files.length; file++)
		{
			var fileName = files[file];
			
			if(fileName.match(/^.*\.js$/i))
			{
				var fileLocation = this.namespaceDir + path.sep + fileName;
				var newClass = new JSClass(fileName, fileLocation);
				
				newClass.resolveClass(this);
				
				this.registeredJSClasses[fileName] = newClass;
			}
			else
			{
				var sourceSubDir = this.namespaceDir + path.sep + fileName;
				var jsNamespace = new JSNamespaceConstructor(fileName, sourceSubDir);
				
				jsNamespace.resolveNamespace(this);
				
				this.registeredChildNamespace[fileName] = jsNamespace;
			}
		}
		
		this._resolveNamespaceIfResourcesAreResolved();
	};

	JSNamespace.classResolved = function(fileName, jsClass)
	{
		delete this.registeredJSClasses[fileName];
		
		this.resolvedJSClasses[fileName] = jsClass;
		
		this._resolveNamespaceIfResourcesAreResolved();
	};

	JSNamespace.namespaceResolved = function(namespace, jsNamespace)
	{
		delete this.registeredChildNamespace[namespace];
		
		this.resolvedChildNamespace[namespace] = jsNamespace;
		
		this._resolveNamespaceIfResourcesAreResolved();
	};

	////////////////////////////////////////
	//		Private methods.
	///////////////////////////////////////
	
	JSNamespace._resolveNamespaceIfResourcesAreResolved = function()
	{
		var noJSClassesToResolve = Object.keys(this.registeredJSClasses).length === 0;
		var noChildNamespacesToResolve = Object.keys(this.registeredChildNamespace).length === 0;
		
		if(noChildNamespacesToResolve && noJSClassesToResolve)
		{
			this.jsNamespaceParent.namespaceResolved(this.namespace, this);
		}
	};
	
	return JSNamespaceConstructor;
})();

module.exports = JSNamespace;