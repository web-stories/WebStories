module.exports = function( grunt ) {
	"use strict";
	return {
		main: {
			options: {
				debug: true,
				base: "src",
				middleware: function( connect, options, middlewares ) {
					middlewares.unshift(
						// Simulate webstories virtual directory to use the original require.main.js
						// mappings, instead of a specific one for testing.
						function virtualDirectory( request, response, next ) {
							var virtual = request.url.split( "/_virtual_/" );
							
							if ( virtual.length > 1 ) {
								request.url = virtual.join( "/" );
								console.log(
									"Rewrite: " + [
										"'" + request.originalUrl + "'",
										"'" + request.url + "'"
									].join( " to " )
								);
							}
							
							return next();
						}
					);
					return middlewares;
				}
			}
		}
	};
};
