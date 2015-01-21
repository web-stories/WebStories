/**
 * angular-jmpress 0.0.1-pre
 *
 * Copyright 2014-2015 Fagner Brack (@FagnerMartinsBrack)
 *
 * Released under the MIT license.
 */
(function( factory ) {
	// There's no specific reason for the current dependency ordering.
	// It just seems semantically correct to load "lodash" and "jquery" first,
	// then the "jquery.jmpress" plugin, and then the "angular-jmpress" wrapper.
	if ( typeof define === "function" && define.amd ) {
		define( [ "lodash", "jquery", "jquery.jmpress", "angular" ], factory );
	} else {
		factory( window._, window.jQuery, undefined, window.angular );
	}
}(function( _, $, undefined, angular ) {
	"use strict";

if ( !$ ) {
	throw new Error( "angular-jmpress requires jQuery" );
}

if ( !angular ) {
	throw new Error( "angular-jmpress requires angular" );
}

if ( !_ ) {
	throw new Error( "angular-jmpress requires lodash" );
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
		compile: function( element ) {
			var HTMLContents = element[ 0 ].innerHTML;

			// We can't make sure angular picks jquery when using shim (see requireJS test)
			element = $( element );

			// Clear the element, the content will be appended back later
			element.empty();

			// Initialize jmpress in the element before link phase to be able to position the
			// HTML contents
			jmpress.init( element );

			// Copy back the HTML contents inside the jmpress canvas, so steps are created in
			// the correct place by angular
			element
				.jmpress( "canvas" )
				.append( HTMLContents );

			return function( scope ) {

				scope.$watch( "settings", function( settings ) {
					if ( !settings ) {
						return;
					}

					$.extend( element.jmpress( "settings" ), settings );
				});

				scope.$watchCollection( "steps", function( steps, previousSteps ) {
					var addedSteps;
					var firstRun = steps === previousSteps;

					if ( !steps ) {
						return;
					}

					if ( firstRun ) {
						addedSteps = steps;
						scope.init();
					} else {
						addedSteps = _.difference( steps, previousSteps );
					}

					var index = 0;
					var stepElements = element.find( ".step" );

					steps.forEach(function( currentStep, currentIndex ) {
						// If this object is not recently added, then skip immediately
						if ( !_.contains( addedSteps, currentStep ) ) {
							return;
						}
						var stepElement = stepElements.eq( currentIndex );
						if ( currentStep.id ) {
							stepElement.attr(  "id", currentStep.id );
						}
						if ( currentStep.data ) {
							$.each( currentStep.data, function( key, value ) {
								stepElement.attr( "data-" + camelCase( key ), value + "" );
							});
						}
						element.jmpress( "init", stepElement );
					});

					var active = jmpress.getActiveReference( steps );
					var elementToActivate = stepElements.eq( active ? active.index : 0 );
					element.jmpress( "goTo", elementToActivate );
				});

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
			};
		}
	};
}

angular.module( "jmpress", [] )
	.directive( "jmpressRoot", [ "$timeout", "jmpress", jmpressRoot ] )
	.service( "jmpress", [ "$timeout", jmpress ] );
}));