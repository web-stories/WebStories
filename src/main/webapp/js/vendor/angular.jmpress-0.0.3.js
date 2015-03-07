/**
 * angular-jmpress 0.0.3
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
		return rootElement.find( settings.stepSelector )[ 0 ];
	};
	function getElementFromUrl( settings ) {
		var element = $( document.getElementById( window.location.hash.replace( /^#\/?/, "" ) ) );
		var stepSelector = settings.stepSelector;
		if ( element.length > 0 && element.is( stepSelector ) ) {
			return element[ 0 ];
		}
	}
}

function jmpress() {
	var element, instanceSteps;
	var methods = {
		"selectInitialStep": []
	};

	this.init = function( initializedElement, scope ) {
		element = initializedElement;
		instanceSteps = scope.steps;
	};

	this.register = function( method, callback ) {
		if ( !( method in methods ) ) {
			throw new Error( "Method '" + method + "' doesn't exist!" );
		}
		methods[ method ].push( callback );
	};

	this.fire = function( method ) {
		var callbackReturn;
		var firingArguments = [].slice.call( arguments, 1 );
		methods[ method ].some(function( callback ) {
			callbackReturn = callback.apply( null, firingArguments );
			if ( callbackReturn ) {
				return true;
			}
		});
		return callbackReturn;
	};

	this.method = function() {
		var args = [].slice.call( arguments );
		return element.jmpress.apply( element, args );
	};

	this.activate = function( steps, callback ) {
		if ( !Array.isArray( steps ) ) {
			callback = steps;
			steps = instanceSteps;
		}

		steps.forEach(function( step ) {
			delete step.active;
		});

		steps.some(function( step ) {
			if ( callback( step ) === true ) {
				step.active = true;
				return true;
			}
		});
	};

	this.findActive = function( index ) {
		return this.getActive( instanceSteps, index );
	};

	this.getActive = function( steps, index ) {
		var activeRef = this.getActiveReference( steps, index );
		if ( activeRef ) {
			return activeRef.step;
		}
	};

	this.getActiveReference = function( steps, index ) {
		var active;
		steps.forEach(function( step, i ) {
			if ( step.active ) {
				active = {
					step: step,
					index: i
				};
			}
		});

		var targetStep, targetIndex;
		if ( active && index ) {
			targetIndex = active.index + index;
			targetStep = steps[ targetIndex ];
			active = targetStep ? {
				step: targetStep,
				index: targetIndex
			} : undefined;
		}

		return active;
	};
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
			jmpress.init( element, scope );

			element.jmpress( "setActive", function( step, eventData ) {
				safeApply( scope, function() {
					var target = scope.steps[ step.index() ];
					if ( target ) {
						target.active = true;
					}
				});
			});

			element.jmpress( "setInactive", function( step, eventData ) {
				safeApply( scope, function() {
					var target = scope.steps[ step.index() ];
					if ( target ) {
						delete target.active;
					}
				});
			});

			scope.init();

			scope.$watchCollection( "steps", function( steps, previousSteps ) {
				if ( !steps ) {
					return;
				}

				// SELECTING THE INITIAL STEP
				// The jmpress mechanism for the initial step does not work when we add steps
				// dynamically with angular.
				var firstStep;
				var activeReference = jmpress.getActiveReference( steps );
				var settings = jmpress.method( "settings" );
				if ( !activeReference ) {
					firstStep =
						initialStep.fromHash( settings ) ||
						jmpress.fire( "selectInitialStep", steps ) ||
						initialStep.fromStart( element, settings );
					if ( $.isPlainObject( firstStep ) ) {
						firstStep = element.find( ".step" ).eq( steps.indexOf( firstStep ) );
					}
					// TODO review the contract for the "goTo" method, changing for plain
					// element seems to change the "setActive" callbacks first argument.
					jmpress.method( "goTo", $( firstStep ) );
				}
			});
		}
	};
}

// A single jmpress callback can be called synchronously inside an angular $digest or
// asynchronously by a jquery implementation in which angular doesn't have control. For that reason
// it may or may not throw an error for an $apply or $digest being already in progress while using
// "scope.$apply" in some jmpress callbacks.
// The recommended solution for similar cases is to use "$timeout", but having one more
// asynchronous operation make it hard to test the module, because we would have to fill the
// tests with several "setTimeouts" to wait for angular "$timeout" to execute.
// Due to the tradeoffs, a check for "scope.$root.$$phase" was choosen over the "$timeout" call.
function safeApply( scope, fn ) {
	if ( scope.$root.$$phase === "$digest" || scope.$root.$$phase === "$apply" ) {
		fn();
	} else {
		scope.$apply( fn );
	}
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