require = (function( require ) {
	"use strict";
	
	var utils = {
		extend: function( extended, extension ) {
			var key, extendedValue, extensionValue;
			for ( key in extension ) {
				if ( !extension.hasOwnProperty( key ) ) {
					continue;
				}
				extendedValue = extended[ key ];
				extensionValue = extension[ key ];
				if ( this.isPlainObj( extensionValue ) && this.isPlainObj( extendedValue ) ) {
					extended[ key ] = this.extend( extendedValue, extensionValue );
					continue;
				}
				extended[ key ] = extensionValue;
			}
			return extended;
		},
		isPlainObj: function( obj ) {
			return Object.prototype.toString.call( obj ) === "[object Object]";
		}
	};
	
	function configs() {
		var key, val, defaultConfigs;
		
		defaultConfigs = {
			waitSeconds: 0, // Prevent "Load timeout for modules" in slow connections
			"map": {
				"*": {
					// Custom modules
					"bootstrap.wizard": "js/bootstrap.wizard",
					"jquery.validate.extend": "js/jquery.validate.extend",
					"jquery.ws.alert": "js/jquery.ws.alert",
					"jquery.ws.editor": "js/jquery.ws.editor",
					"jquery.ws.remaining": "js/jquery.ws.remaining",
					"jquery.ws.story": "js/jquery.ws.story",
					"jquery.jmpress": "js/jquery.jmpress",
					"webstories": "js/webstories",
					
					// Vendor modules
					"bootstrap": "../js/bootstrap-3.2.0",
					"bootstrap.custom": "../js/bootstrap.custom-0.1.1",
					"jquery.simulate": "../js/jquery.simulate-1.0.0",
					"jquery.ui.widget": "../js/jquery.ui.widget-1.11.1",
					"jquery.validate": "../js/jquery.validate-1.13.0",
					"jquery.jmpress.active": "../js/jquery.jmpress.active-1.0.0-pre",
					"jquery.jmpress.circular": "../js/jquery.jmpress.circular-1.0.0-pre",
					"jquery.jmpress.core": "../js/jquery.jmpress.core-1.0.0-pre",
					"jquery.jmpress.hash": "../js/jquery.jmpress.hash-1.0.0-pre",
					"jquery.jmpress.mobile": "../js/jquery.jmpress.mobile-1.0.0-pre",
					"jquery.jmpress.near": "../js/jquery.jmpress.near-1.0.0-pre",
					"jquery.jmpress.start": "../js/jquery.jmpress.start-1.0.0-pre",
					"jquery.jmpress.transform": "../js/jquery.jmpress.transform-1.0.0-pre",
					"fastclick": "../js/fastclick-1.0.3",
					"lodash": "../js/lodash-2.4.1",
					"angular": "../js/angular-1.3.4",
					"angular.resource": "../js/angular.resource-1.3.4",
					"angular.smoothscroll": "../js/angular.smoothscroll-1.7.1",
					"angular.jmpress": "../js/angular.jmpress-0.0.1-pre",
					
					// Make jQuery method private
					"jquery": "js/jquery.private"
				},
				"js/jquery.private": {
					"jquery":"jquery"
				}
			},
			"paths": {
				"jquery": [
					"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
					"../js/jquery-2.1.1"
				]
			}
		};
		
		return defaultConfigs;
	}
	
	return utils.extend( configs(), require );
}( require ));
