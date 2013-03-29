var Logger = require('../Logger');

DirectoryScanner = (function(){
    'use strict';
	
	var fs = {};
	var path = {};
	var JSNamespace = {};
    
    function DirectoryScannerConstructor(jsResourceRegistry)
    {
		this.registeredSource = {};
		
		this.jsResourceRegistry = jsResourceRegistry;
	}

	DirectoryScannerConstructor.injectDependencies = function(FS, PATH, JSNAMESPACE)
	{
		fs = FS, path = PATH, JSNamespace = JSNAMESPACE;
	};

	var DirectoryScanner = DirectoryScannerConstructor.prototype;
	
	DirectoryScanner.scanSource = function(srcRoot)
	{
		this.registeredSource[srcRoot] = true;
		
		fs.readdir(srcRoot, this.sourceDirRead.bind(this, srcRoot));
	};

	DirectoryScanner.sourceDirRead = function(sourceDir, error, files)
	{
		if(error)
		{
			Logger.logError('Error while trying to read the source directory (%s).', error, [librariesRoot]);
		}
		else
		{
			for(var file = 0; file < files.length; file++)
			{
				var fileName = files[file];
				var sourceSubDir = sourceDir + path.sep + fileName;
				
				var jsNamespaceRoot = new JSNamespace(fileName, sourceSubDir);

				this.jsResourceRegistry.registerNamespace(fileName, jsNamespaceRoot);

				jsNamespaceRoot.resolveNamespace(this.jsResourceRegistry);
			}
		}
		
		delete this.registeredSource[sourceDir];
		
		this._ifAllRegisteredDirectoriesScannedAllowRegistryToProceed();
	};

	////////////////////////////////////////
	//		Private methods.
	////////////////////////////////////////

	DirectoryScanner._ifAllRegisteredDirectoriesScannedAllowRegistryToProceed = function()
	{
		var sourceDirToResolve = Object.keys(this.registeredSource);
		
		if(sourceDirToResolve.length === 0)
		{
			this.jsResourceRegistry.allResourcesRegistered();
		}
	};

    return DirectoryScannerConstructor;
})();

module.exports = DirectoryScanner;