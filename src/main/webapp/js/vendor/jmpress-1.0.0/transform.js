/*
 * transform.js
 * The engine that powers the transforms or falls back to other methods
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "./core" ], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

	"use strict";

	/* FUNCTIONS */
	function toCssNumber( number ) {
		return ( Math.round( 10000 * number ) / 10000 ) + "";
	}

	/**
	 * 3D and 2D engines
	 */
	var jmpressDefaults,
		engines = {
			3: {
				transform: function( el, data, settings ) {
					var originX = settings.originX,
						originY = settings.originY,
						transform = "translate(-" + originX + ",-" + originY + ")";
					$.each( data, function( idx, item ) {
						var i, order,
							coord = [ "X", "Y", "Z" ];
						if ( item[ 0 ] === "translate" ) { // [ "translate", x, y, z ]
							transform += " translate3d(" + toCssNumber( item[ 1 ] || 0 ) + "px," +
								toCssNumber( item[ 2 ] || 0 ) + "px," +
								toCssNumber( item[ 3 ] || 0 ) + "px)";
						} else if ( item[ 0 ] === "rotate" ) {
							order = item[ 4 ] ? [ 1, 2, 3 ] : [ 3, 2, 1 ];
							for ( i = 0; i < 3; i++ ) {
								transform += " rotate" + coord[ order[ i ] - 1 ] +
									"(" + toCssNumber( item[ order[ i ] ] || 0 ) + "deg)";
							}
						} else if ( item[ 0 ] === "scale" ) {
							for ( i = 0; i < 3; i++ ) {
								transform += " scale" + coord[ i ] +
									"(" + toCssNumber( item[ i + 1 ] || 1 ) + ")";
							}
						}
					});
					$.jmpress( "css", el, $.extend({}, {
						transform: transform
					}));
				}
			},
			2: {
				transform: function( el, data, settings ) {
					var originX = settings.originX,
						originY = settings.originY,
						transform = "translate(-" + originX + ",-" + originY + ")";
					$.each( data, function( idx, item ) {
						var i,
							coord = [ "X", "Y" ];
						if ( item[ 0 ] === "translate" ) { // [ "translate", x, y, z ]
							transform += " translate(" + toCssNumber( item[ 1 ] || 0 ) + "px," +
								toCssNumber( item[ 2 ] || 0 ) + "px)";
						} else if ( item[ 0 ] === "rotate" ) {
							transform += " rotate(" + toCssNumber( item[ 3 ] || 0 ) + "deg)";
						} else if ( item[ 0 ] === "scale" ) {
							for ( i = 0; i < 2; i++ ) {
								transform += " scale" + coord[ i ] +
									"(" + toCssNumber( item[ i + 1 ] || 1 ) + ")";
							}
						}
					});
					$.jmpress( "css", el, $.extend({}, {
						transform: transform
					}));
				}
			}
		},

		/**
		 * Engine to power cross-browser translate, scale and rotate.
		 */
		engine = (function() {
			if ( $.jmpress( "pfx", "perspective" ) ) {
				return engines[ 3 ];
			} else if ( $.jmpress( "pfx", "transform" ) ) {
				return engines[ 2 ];
			}
		}());

	if ( !engine ) {
		$.jmpress( "checkNoSupport", function() {
			return true;
		});
	}

	jmpressDefaults = $.jmpress( "defaults" );
	jmpressDefaults.reasonableAnimation = {};
	jmpressDefaults.originX = "50%";
	jmpressDefaults.originY = "50%";
	$.jmpress( "initStep", function( step, eventData ) {
		var stepDataAttributes = eventData.data,
			rootDataAttributes = eventData.rootData,
			stepData = eventData.stepData,
			pf = parseFloat;

		$.extend( stepData, {
			x: pf( stepDataAttributes.x ) || 0,
			y: pf( stepDataAttributes.y ) || 0,
			z: pf( stepDataAttributes.z ) || 0,
			r: pf( stepDataAttributes.r ) || 0,
			phi: pf( stepDataAttributes.phi ) || 0,
			rotate: pf( stepDataAttributes.rotate ) || 0,
			rotateX: pf( stepDataAttributes.rotateX ) || 0,
			rotateY: pf( stepDataAttributes.rotateY ) || 0,
			rotateZ: pf( stepDataAttributes.rotateZ ) || 0,
			revertRotate: false,
			scale: pf( stepDataAttributes.scale) || 1,
			scaleX: pf( stepDataAttributes.scaleX ) || false,
			scaleY: pf( stepDataAttributes.scaleY ) || false,
			scaleZ: pf( stepDataAttributes.scaleZ ) || 1
		});

		if ( stepDataAttributes.transitionDuration ) {
			stepData.transitionDuration = +stepDataAttributes.transitionDuration;
		} else if ( rootDataAttributes.transitionDuration ) {
			stepData.transitionDuration = +rootDataAttributes.transitionDuration;
		}
	});
	$.jmpress( "beforeInit", function( nil, eventData ) {
		$.jmpress( "css", eventData.area, {
			left: eventData.settings.originX,
			top: eventData.settings.originY,
			perspective: "1000px"
		});
	});
	$.jmpress( "afterInit", function( nil, eventData ) {
		var nestedSteps,
			stepSelector = eventData.settings.stepSelector,
			current = eventData.current;
		current.perspectiveScale = 1;
		current.maxNestedDepth = 0;
		nestedSteps = $( eventData.jmpress ).find( stepSelector ).children( stepSelector );
		while ( nestedSteps.length ) {
			current.maxNestedDepth++;
			nestedSteps = nestedSteps.children( stepSelector );
		}
	});
	$.jmpress( "applyStep", function( step, eventData ) {
		$.jmpress( "css", $( step ), {
			position: "absolute",
			transformStyle: "preserve-3d"
		});
		if ( eventData.parents.length > 0 ) {
			$.jmpress( "css", $( step ), {
				top: "50%",
				left: "50%"
			});
		}
		var sd = eventData.stepData,
			transform = [
				[
					"translate",
					sd.x || ( sd.r * Math.sin( sd.phi * Math.PI / 180 ) ),
					sd.y || ( -sd.r * Math.cos( sd.phi * Math.PI / 180 ) ),
					sd.z
				], [
					"rotate",
					sd.rotateX,
					sd.rotateY,
					sd.rotateZ || sd.rotate,
					true
				], [
					"scale",
					sd.scaleX || sd.scale,
					sd.scaleY || sd.scale,
					sd.scaleZ || sd.scale
				]
			];
		engine.transform( step, transform, eventData.settings );
	});
	$.jmpress( "setActive", function( element, eventData ) {
		var i,
			target = eventData.target,
			step = eventData.stepData,
			tf = target.transform = [];

		target.perspectiveScale = 1;

		for ( i = eventData.current.maxNestedDepth; i > ( eventData.parents.length || 0 ); i-- ) {
			tf.push( [ "scale" ], [ "rotate" ], [ "translate" ] );
		}

		tf.push([
			"scale",
			1 / ( step.scaleX || step.scale ),
			1 / ( step.scaleY || step.scale ),
			1 / ( step.scaleZ )
		]);
		tf.push([
			"rotate",
			-step.rotateX,
			-step.rotateY,
			-( step.rotateZ || step.rotate )
		]);
		tf.push([
			"translate",
			-( step.x || ( step.r * Math.sin( step.phi * Math.PI / 180 ) ) ),
			-(step.y || ( -step.r * Math.cos( step.phi * Math.PI / 180 ) ) ),
			-step.z
		]);
		target.perspectiveScale *= ( step.scaleX || step.scale );

		$.each( eventData.parents, function( idx, element ) {
			var step = $( element ).data( "stepData" );
			tf.push([
				"scale",
				1 / ( step.scaleX || step.scale ),
				1 / ( step.scaleY || step.scale ),
				1 / ( step.scaleZ )
			]);
			tf.push([
				"rotate",
				-step.rotateX,
				-step.rotateY,
				-( step.rotateZ || step.rotate )
			]);
			tf.push([
				"translate",
				-( step.x || ( step.r * Math.sin( step.phi * Math.PI / 180 ) ) ),
				-( step.y || ( -step.r * Math.cos( step.phi * Math.PI / 180 ) ) ),
				-step.z
			]);
			target.perspectiveScale *= ( step.scaleX || step.scale );
		});

		$.each( tf, function( idx, item ) {
			if ( item[ 0 ] !== "rotate" ) {
				return;
			}
			function lowRotate( name ) {
				if ( eventData.current[ "rotate" + name + "-" + idx ] === undefined ) {
					eventData.current[ "rotate" + name + "-" + idx ] = item[ name ] || 0;
				}
				var diff,
					cur = eventData.current[ "rotate" + name + "-" + idx ],
					tar = item[ name ] || 0,
					curmod = cur % 360,
					tarmod = tar % 360;
				if ( curmod < 0 ) {
					curmod += 360;
				}
				if ( tarmod < 0 ) {
					tarmod += 360;
				}
				diff = tarmod - curmod;
				if ( diff < -180 ) {
					diff += 360;
				} else if ( diff > 180 ) {
					diff -= 360;
				}
				eventData.current[ "rotate" + name + "-" + idx ] = item[ name ] = cur + diff;
			}
			lowRotate( 1 );
			lowRotate( 2 );
			lowRotate( 3 );
		});
	});
	$.jmpress( "applyTarget", function( active, eventData ) {
		var extracted = [],
			lastScale = -1,
			settings = eventData.settings,
			animation = $.extend( {}, settings.animation ),
			target = eventData.target,
			step = eventData.stepData,
			zoomin = target.perspectiveScale * 1.3 < eventData.current.perspectiveScale,
			zoomout = target.perspectiveScale > eventData.current.perspectiveScale * 1.3,
			props = $.extend( {}, animation, {
				// To keep the perspective look similar for different scales, we need to 'scale'
				// the perspective, too
				perspective: Math.round( target.perspectiveScale * 1000 ) + "px"
			});

		// Extract first scale from transform
		$.each( target.transform, function( idx, item ) {
			if ( item.length <= 1 ) {
				return;
			}
			if ( item[ 0 ] === "rotate" &&
				item[ 1 ] % 360 === 0  &&
				item[ 2 ] % 360 === 0  &&
				item[ 3 ] % 360 === 0 ) {
				return;
			}
			if ( item[ 0 ] === "scale" ) {
				lastScale = idx;
			} else {
				return false;
			}
		});

		if ( lastScale !== eventData.current.oldLastScale ) {
			zoomin = zoomout = false;
			eventData.current.oldLastScale = lastScale;
		}

		if ( lastScale !== -1 ) {
			while ( lastScale >= 0 ) {
				if ( target.transform[ lastScale ][ 0 ] === "scale" ) {
					extracted.push( target.transform[ lastScale ] );
					target.transform[ lastScale ] = [ "scale" ];
				}
				lastScale--;
			}
		}

		if ( settings.reasonableAnimation[ eventData.reason ] ) {
			animation = $.extend( {}, animation, settings.reasonableAnimation[ eventData.reason ] );
		}

		// Apply the transition-duration from data attributes
		if ( step.transitionDuration ) {
			animation.transitionDuration = step.transitionDuration + "ms";
		}

		if ( !zoomin ) {
			props.transitionDelay = "0s";
		}

		$.jmpress( "css", eventData.area, props );
		engine.transform( eventData.area, extracted, eventData.settings );

		props = $.extend( {}, animation );
		if ( !zoomout ) {
			props.transitionDelay = "0s";
		}

		eventData.current.perspectiveScale = target.perspectiveScale;

		$.jmpress( "css", eventData.canvas, props );
		engine.transform( eventData.canvas, target.transform, eventData.settings );
	});
}));
