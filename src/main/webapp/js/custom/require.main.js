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
			"map": {
				"*": {
					// Custom modules
					"bootstrap.wizard": "js/bootstrap.wizard",
					"jquery.validate.extend": "js/jquery.validate.extend",
					"jquery.ws.alert": "js/jquery.ws.alert",
					"jquery.ws.editor": "js/jquery.ws.editor",
					"jquery.ws.remaining": "js/jquery.ws.remaining",
					"jquery.ws.story": "js/jquery.ws.story",
					"webstories": "js/webstories",
					
					// Vendor modules
					"bootstrap": "../js/bootstrap-3.2.0",
					"bootstrap.custom": "../js/bootstrap.custom-0.1.1",
					"impress": "../js/impress-0.5.4-pre",
					"jquery.simulate": "../js/jquery.simulate-1.0.0",
					"jquery.ui.widget": "../js/jquery.ui.widget-1.11.1",
					"jquery.validate": "../js/jquery.validate-1.13.0",
					"fastclick": "../js/fastclick-1.0.3",
					"angular": "../js/angular-1.3.4",
					"angular.resource": "../js/angular.resource-1.3.4",
					
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
		
		if ( require.test ) {
			// Handle default mapping
			Object.keys( defaultConfigs.map[ "*" ] ).forEach(function( key ) {
				var val = defaultConfigs.map[ "*" ][ key ];
				if ( val.substring( 0, "../".length ) === "../" ) {
					defaultConfigs.map[ "*" ][ key ] =
						val.substring( "../".length, val.length );
				}
			});
			// Handle local CDN fallback in the second element the array
			Object.keys( defaultConfigs.paths ).forEach(function( key ) {
				var fallback = defaultConfigs.paths[ key ][ 1 ];
				if ( fallback.substring( 0, "../".length ) === "../" ) {
					defaultConfigs.paths[ key ][ 1 ] =
						fallback.substring( "../".length, fallback.length );
				}
			});
		}
		
		return defaultConfigs;
	}
	
	return utils.extend( configs(), require );
}( require ));
