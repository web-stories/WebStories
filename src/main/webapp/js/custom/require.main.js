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
	
	var FilesConfig = function() {};
	
	FilesConfig.prototype.files = [
		"bootstrap-3.2.0",
		"bootstrap.custom-0.1.0",
		"bootstrap.wizard",
		"jquery.ui.widget-1.11.1",
		"jquery.validate-1.13.0",
		"jquery.validate.extend",
		"jquery.ws.alert.saving",
		"jquery.ws.editor",
		"jquery.ws.remaining",
		"webstories"
	];
	
	FilesConfig.prototype.createMap = function() {
		var file, name, version;
		var index = 0;
		var result = { "*": {} };
		for ( ; index < this.files.length; index += 1 ) {
			file = this.files[ index ];
			name = file.split( "-" )[ 0 ];
			version = file.split( "-" )[ 1 ];
			result[ "*" ][ name ] = this[
				version ? "staticContext" : "buildContext"
			]( file );
		}
		return result;
	};
	
	FilesConfig.prototype.createConfig = function( require ) {
		var configObject = {
			map: this.createMap()
		};
		
		// jQuery special map config
		configObject.map[ "*" ] = utils.extend(configObject.map[ "*" ], {
			jquery: this.buildContext( "jquery.private" )
		});
		configObject.map[ this.buildContext( "jquery.private" ) ] = {
			jquery: "jquery"
		};
		
		// CDN
		configObject.paths = {
			jquery: [
				"//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
				this.staticContext( "jquery-2.1.1" )
			]
		};
		
		return utils.extend( require, configObject );
	};
	
	/**
	 * /static/js/resourceName
	 */
	FilesConfig.prototype.staticContext = function( resourceName ) {
		return "../js/" + resourceName;
	};
	
	/**
	 * /static/{build}/js/resourceName.js
	 */
	FilesConfig.prototype.buildContext = function( resourceName ) {
		return "js/" + resourceName;
	};
	
	return new FilesConfig().createConfig( require );
}( require ));