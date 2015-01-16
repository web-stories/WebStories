/**
 * angular-jmpress 0.0.1-pre
 *
 * Copyright 2014-2015 Fagner Brack (@FagnerMartinsBrack)
 *
 * Released under the MIT license.
 */
(function( factory ) {
	// There's no specific reason for the current dependency ordering.
	// It just seems semantically correct to load "jquery" first, then the "jquery.jmpress" plugin,
	// and then the "angular-jmpress" wrapper.
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "jquery.jmpress", "angular" ], factory );
	} else {
		factory( window.jQuery, undefined, window.angular );
	}
}(function( $, undefined, angular ) {
	"use strict";

if ( !$ ) {
	throw new Error( "angular-jmpress requires jQuery" );
}

if ( !angular ) {
	throw new Error( "angular-jmpress requires angular" );
}

var jQuery = $;
function camelCase( str ) {
	str = str.replace( /([A-Z])/g, function( $1 ) {
		return "-" + $1.toLowerCase();
	});
	return str.charAt( 0 ) == "-" ? str.substr( 1 ) : str;
}

function jmpress( $timeout ) {
	var element, methodName;
	var instance = this;
	var publicMethods = {
		getActiveReference: function( steps ) {
			var result;
			var index = 0;
			for ( ; index < steps.length; index += 1 ) {
				if ( steps[ index ].active ) {
					result = {
						step: steps[ index ],
						index: index
					};
					break;
				}
			}
			return result;
		},
		method: function() {
			var args = [].slice.call( arguments );
			element.jmpress.apply( element, args );
		}
	};

	this.init = function( elementToInitialize ) {
		elementToInitialize.jmpress();
		element = elementToInitialize;
	};

	for ( methodName in publicMethods ) {
		instance[ methodName ] = (function( methodName ) {
			return function() {
				var args = [].slice.call( arguments );
				if ( !element ) {
					console.error( "jmpress not initialized when calling '" + methodName + "'" );
				}
				return publicMethods[ methodName ].apply( instance, args );
			};
		}( methodName ));
	}
}

function jmpressRoot( $timeout, jmpress ) {
	return {
		restrict: "A",
		scope: {
			init: "&jmpressInit",
			settings: "=jmpressSettings",
			steps: "=jmpressSteps"
		},
		link: function( scope, element ) {
			// We can't make sure angular picks jquery when using shim (see requireJS test)
			element = $( element );

			scope.$watch( "settings", function( settings ) {
				if ( !settings ) {
					return;
				}

				checkInitialization(function() {
					$.extend( element.jmpress( "settings" ), settings );
				});
			});

			scope.$watch( "steps", function( steps ) {
				if ( !steps ) {
					return;
				}

				var index = 0;
				var stepElements = element.find( ".step" );

				stepElements.each(function( index, stepElement ) {
					var step = steps[ index ];
					stepElement = $( stepElement );
					if ( step.id ) {
						stepElement.attr( "id", step.id );
					}
					if ( step.data ) {
						$.each( steps[ index ].data, function( key, value ) {
							stepElement.attr( "data-" + camelCase( key ), value + "" );
						});
					}
				});

				checkInitialization(function() {
					element.jmpress( "setActive", function( step, eventData ) {
						$timeout(function() {
							scope.steps[ step.index() ].active = true;
						});
					});
					element.jmpress( "setInactive", function( step, eventData ) {
						$timeout(function() {
							delete scope.steps[ step.index() ].active;
						});
					});
				});

				var active = jmpress.getActiveReference( steps );
				if ( active ) {
					element.jmpress( "goTo", stepElements.eq( active.index ) );
				}
			});

			function checkInitialization( callback ) {
				if ( !element.jmpress( "initialized" ) ) {

					// Initialize jmpress in the element
					jmpress.init( element );

					// Triggers the init callback in the angular context
					scope.init();

					// Execute the desired process
					callback();
				}
			}
		}
	};
}

angular.module( "jmpress", [] )
	.directive( "jmpressRoot", [ "$timeout", "jmpress", jmpressRoot ] )
	.service( "jmpress", [ "$timeout", jmpress ] );
}));