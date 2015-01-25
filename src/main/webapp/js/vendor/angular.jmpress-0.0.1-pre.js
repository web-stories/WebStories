/**
 * angular-jmpress 0.0.1-pre
 *
 * Copyright 2014-2015 Fagner Brack (@FagnerMartinsBrack)
 *
 * Released under the MIT license.
 */
(function( factory ) {
	// There's no specific reason for the current dependency ordering.
	// It just seems semantically correct to load "jquery" first,
	// then the "jquery.jmpress" plugin, and then the "angular-jmpress" wrapper.
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

function initialStep() {
	this.fromHash = function( settings ) {
		// Only get from hash if the module is available
		if ( settings.hash && settings.hash.use ) {
			return getElementFromUrl( settings );
		}
	};
	this.fromStart = function( rootElement, settings ) {
		return rootElement.find( settings.stepSelector );
	};
	function getElementFromUrl( settings ) {
		var element = $( "#" + window.location.hash.replace( /^#\/?/, "" ) );
		var stepSelector = settings.stepSelector;
		if ( element.length > 0 && element.is( stepSelector ) ) {
			return element;
		}
	}
}

function jmpress() {
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
			return element.jmpress.apply( element, args );
		}
	};

	this.init = function( initializedElement ) {
		element = initializedElement;
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

function jmpressRoot( $compile, jmpress, initialStep ) {
	return {
		restrict: "A",
		transclude: true,
		scope: {
			init: "&jmpressInit",
			steps: "=jmpressSteps"
		},
		controller: [ "$scope", "$element", function( $scope, $element ) {
			this.getStep = function( index ) {
				return $scope.steps[ index ];
			};
			this.getRootElement = function() {
				return $element;
			};
		}],
		link: function( scope, element, attrs, controller, linker ) {

			// jmpress is bound to jquery, not angular jqLite
			element = $( element[ 0 ] );

			$.jmpress( "beforeInit", function() {
				linker( scope, function( clone ) {
					var canvas = element.jmpress( "canvas" );
					var compiledContent = $compile( clone )( scope );
					canvas.append( compiledContent );
				});
			});

			element.jmpress();
			jmpress.init( element );

			element.jmpress( "setActive", function( step, eventData ) {
				var target = scope.steps[ step.index() ];
				if ( target ) {
					target.active = true;
				}
			});

			element.jmpress( "setInactive", function( step, eventData ) {
				var target = scope.steps[ step.index() ];
				if ( target ) {
					delete target.active;
				}
			});

			scope.init();

			scope.$watchCollection( "steps", function( steps, previousSteps ) {
				if ( !steps ) {
					return;
				}

				// SELECTING THE INITIAL STEP
				// The initial step does not work when we add steps dynamically with
				// angular.
				// For now replicate some of the behavior here.
				var settings, firstStep;
				if ( jmpress.getActiveReference( steps ) === undefined ) {
					settings = jmpress.method( "settings" );
					firstStep =
						initialStep.fromHash( settings ) ||
						initialStep.fromStart( element, settings );
					jmpress.method( "goTo", firstStep );
				}
			});
		}
	};
}

function jmpressStep( jmpress ) {
	return {
		restrict: "A",
		require: "^^jmpressRoot",
		link: function( scope, stepElement, attrs, rootController ) {
			var currentStep = rootController.getStep( scope.$index );
			var rootElement = rootController.getRootElement();

			if ( currentStep.id ) {
				stepElement.attr(  "id", currentStep.id );
			}

			if ( currentStep.data ) {
				$.each( currentStep.data, function( key, value ) {
					stepElement.attr( "data-" + camelCase( key ), value + "" );
				});
			}

			rootElement.jmpress( "init", stepElement );

			if ( currentStep.active ) {
				rootElement.jmpress( "goTo", stepElement );
			}
		}
	};
}

angular.module( "jmpress", [] )
	.directive( "jmpressRoot", [ "$compile", "jmpress", "initialStep", jmpressRoot ] )
	.directive( "jmpressStep", [ "jmpress", jmpressStep ] )
	.service( "jmpress", [ jmpress ] )
	.service( "initialStep", [ initialStep ] );
}));