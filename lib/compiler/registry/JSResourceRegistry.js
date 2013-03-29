
JSResourceRegistry = (function(){
	'use strict';
	
	function JSResourceRegistryConstructor()
	{
		this.resolvedNamespaces = {};
		this.registeredNamespaces = {};
	}
	
	var JSResourceRegistry = JSResourceRegistryConstructor.prototype;
	
	JSResourceRegistry.addResourcesResolvedListener = function(registryListener)
	{
		this.registryListener = registryListener;
	};
	
	JSResourceRegistry.registerNamespace = function(namespace, jsNamespaceRoot)
	{
		this.registeredNamespaces[namespace] = jsNamespaceRoot;
	};
	
	JSResourceRegistry.namespaceResolved = function(namespace, jsNamespaceRoot)
	{
		delete this.registeredNamespaces[namespace];
		this.resolvedNamespaces[namespace] = jsNamespaceRoot;
		
		this._notifyListenerWhenResourcesAreResolved();
	};

	JSResourceRegistry.allResourcesRegistered = function()
	{
		this.resourcesRegistered = true;
		
		this._notifyListenerWhenResourcesAreResolved();
	};

	////////////////////////////////////////
	//		Private methods.
	////////////////////////////////////////

	JSResourceRegistry._notifyListenerWhenResourcesAreResolved = function()
	{
		if(this._haveResourcesBeenResolved())
		{
			this.registryListener.resourcesResolved();
		}
	};

	JSResourceRegistry._haveResourcesBeenResolved = function()
	{
		var namespacesToResolve = Object.keys(this.registeredNamespaces);
		
		if(this.resourcesRegistered === true && namespacesToResolve.length === 0)
		{
			return true;
		}
	};

	return JSResourceRegistryConstructor;
})();

module.exports = JSResourceRegistry;
