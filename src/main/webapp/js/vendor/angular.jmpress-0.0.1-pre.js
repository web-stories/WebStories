/**
 * angular-jmpress 0.0.1-pre
 *
 * Copyright 2014-2015 Fagner Brack (@FagnerMartinsBrack)
 *
 * Released under the MIT license.
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "angular" ], factory );
	} else {
		factory( window.jQuery, window.angular );
	}
}(function( $, angular ) {
	"use strict";

if ( !$ ) {
	throw new Error( "angular-jmpress requires jQuery" );
}

if ( !angular ) {
	throw new Error( "angular-jmpress requires angular" );
}

var jQuery = $;
/*!
 * jmpress.js v1.0.0-pre
 * https://github.com/web-stories/jmpress.js
 *
 * A jQuery plugin to build a website on the infinite canvas.
 *
 * Copyright 2015 Kyle Robinson Young @shama & Tobias Koppers @sokra
 * Licensed MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Based on the foundation laid by Bartek Szopka @bartaz
 */
/*
 * core.js
 * The core of jmpress.js
 */
(function( $, document, window, undefined ) {

	"use strict";

	var methods, defaults, callbacks, callbackName,
		/**
		 * Set supported prefixes
		 *
		 * @access protected
		 * @return Function to get prefixed property
		 */
		pfx = (function() {
			var style = document.createElement( "dummy" ).style,
				prefixes = [ "Webkit", "Moz", "O", "ms", "Khtml", "" ],
				memory = {};
			return function( prop ) {
				var i, ucProp, props;
				if ( typeof memory[ prop ] === "undefined" ) {
					ucProp  = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 );
					props = ( prop + " " + prefixes.join( ucProp + " " ) + ucProp ).split( " " );
					memory[ prop ] = null;
					for ( i in props ) {
						if ( style[ props[ i ] ] !== undefined ) {
							memory[ prop ] = props[ i ];
							break;
						}
					}
				}
				return memory[ prop ];
			};
		}());

	/**
	 * map ex. "WebkitTransform" to "-webkit-transform"
	 */
	function mapProperty( name ) {
		var index, prefix, postfix;
		if ( !name ) {
			return;
		}
		index = 1 + name.substr( 1 ).search( /[A-Z]/ );
		prefix = name.substr( 0, index ).toLowerCase();
		if ( prefix === "" ) {
			return name.toLowerCase();
		}
		postfix = name.substr( index ).toLowerCase();
		return "-" + prefix + "-" + postfix;
	}
	function addComma( attribute ) {
		if ( !attribute ) {
			return "";
		}
		return attribute + ",";
	}
	/**
	 * Return an jquery object only if it's not empty
	 */
	function ifNotEmpty( el ) {
		if ( el.length > 0 ) {
			return el;
		}
		return null;
	}

	/**
	 * Default Settings
	 */
	defaults = {
		/* CLASSES */
		stepSelector: ".step",
		containerClass: "",
		canvasClass: "",
		areaClass: "",
		notSupportedClass: "not-supported",

		/* CONFIG */
		fullscreen: true,

		/* ANIMATION */
		animation: {
			transformOrigin: "top left",
			transitionProperty:
				addComma( mapProperty( pfx( "transform" ) ) ) +
				addComma( mapProperty( pfx( "perspective" ) ) ) +
				"opacity",
			transitionDuration: "1s",
			transitionDelay: "500ms",
			transitionTimingFunction: "ease-in-out",
			transformStyle: "preserve-3d"
		}
	};

	callbacks = {
		"beforeChange": 1,
		"beforeInitStep": 1,
		"initStep": 1,
		"checkNoSupport": 1,
		"beforeInit": 1,
		"afterInit": 1,
		"beforeDeinit": 1,
		"afterDeinit": 1,
		"applyStep": 1,
		"unapplyStep": 1,
		"setInactive": 1,
		"beforeActive": 1,
		"setActive": 1,
		"selectInitialStep": 1,
		"selectPrev": 1,
		"selectNext": 1,
		"selectHome": 1,
		"selectEnd": 1,
		"idle": 1,
		"applyTarget": 1
	};

	for ( callbackName in callbacks ) {
		defaults[ callbackName ] = [];
	}

	/**
	 * Initialize jmpress
	 */
	function init( args ) {
		var props, steps, callbackArgs, callbackName, settings,

			/*** MEMBER VARS ***/

			jmpress = $( this ),
			container = null,
			area = null,
			oldStyle = {
				container: "",
				area: ""
			},
			canvas = null,
			current = null,
			active = false,
			activeSubstep = null,
			activeDelegated = false;

		args = $.extend( true, {}, args || {} );

		// accept functions and arrays of functions as callbacks
		callbackArgs = {};
		callbackName = null;
		for ( callbackName in callbacks ) {
			callbackArgs[ callbackName ] = $.isFunction( args[ callbackName ] ) ?
				[ args[ callbackName ] ] :
				args[ callbackName ];
			args[ callbackName ] = [];
		}

		// MERGE SETTINGS
		settings = $.extend( true, {}, defaults, args );

		for ( callbackName in callbacks ) {
			if ( callbackArgs[ callbackName ] ) {
				Array.prototype.push.apply(
					settings[ callbackName ],
					callbackArgs[ callbackName ]
				);
			}
		}

		/*** MEMBER FUNCTIONS ***/
		// functions have to be called with this

		/**
		 * Init a single step
		 *
		 * @param element the element of the step
		 * @param idx number of step
		 */
		function doStepInit( element, idx ) {
			var data = dataset( element ),
				rootData = dataset( jmpress ),
				step = {
					oldStyle: $( element ).attr( "style" ) || ""
				},
				callbackData = {
					data: data,
					rootData: rootData,
					stepData: step
				};

			callCallback.call( this, "beforeInitStep", $( element ), callbackData );
			step.delegate = data.delegate;
			callCallback.call( this, "initStep", $( element ), callbackData );

			$( element ).data( "stepData", step );

			if ( !$( element ).attr( "id" ) ) {
				$( element ).attr( "id", "step-" + ( idx + 1 ) );
			}

			callCallback.call( this, "applyStep", $( element ), callbackData );
		}
		/**
		 * Deinit a single step
		 *
		 * @param element the element of the step
		 */
		function doStepDeinit( element ) {
			var stepData = $( element ).data( "stepData" );

			$( element ).attr( "style", stepData.oldStyle );

			callCallback.call( this, "unapplyStep", $( element ), {
				stepData: stepData
			});
		}
		/**
		 * Reapplies stepData to the element
		 *
		 * @param element
		 */
		function doStepReapply( element ) {
			callCallback.call( this, "unapplyStep", $( element ), {
				stepData: element.data( "stepData" )
			});

			callCallback.call( this, "applyStep", $( element ), {
				stepData: element.data( "stepData" )
			});
		}
		/**
		 * Completly deinit jmpress
		 *
		 */
		function deinit() {
			if ( active ) {
				callCallback.call( this, "setInactive", active, {
					stepData: $( active ).data( "stepData" ),
					reason: "deinit"
				});
			}
			if ( current.jmpressClass ) {
				$( jmpress ).removeClass( current.jmpressClass );
			}

			callCallback.call( this, "beforeDeinit", $( this ), {} );

			$( settings.stepSelector, jmpress ).each(function( idx ) {
				doStepDeinit.call( jmpress, this );
			});

			container.attr( "style", oldStyle.container );
			if ( settings.fullscreen ) {
				$( "html" ).attr( "style", "" );
			}
			area.attr( "style", oldStyle.area );
			$( canvas ).children().each(function() {
				jmpress.append( $( this ) );
			});
			if ( settings.fullscreen ) {
				canvas.remove();
			} else {
				canvas.remove();
				area.remove();
			}

			callCallback.call( this, "afterDeinit", $(this), {} );

			$( jmpress ).data( "jmpressmethods", false );

			if ( current.idleTimeout ) {
				clearTimeout( current.idleTimeout );
			}
		}
		/**
		 * Call a callback
		 *
		 * @param callbackName String callback which should be called
		 * @param element some arguments to the callback
		 * @param eventData
		 */
		function callCallback( callbackName, element, eventData ) {
			eventData.settings = settings;
			eventData.current = current;
			eventData.container = container;
			eventData.parents = element ? getStepParents( element ) : null;
			eventData.current = current;
			eventData.jmpress = this;
			var result = {};
			$.each( settings[ callbackName ], function( idx, callback ) {
				result.value = callback.call( jmpress, element, eventData ) || result.value;
			});
			return result.value;
		}
		/**
		 *
		 */
		function getStepParents( el ) {
			return $( el ).parentsUntil( jmpress ).not( jmpress ).filter( settings.stepSelector );
		}
		/**
		 * Reselect the active step
		 *
		 * @param String type reason of reselecting step
		 */
		function reselect( type ) {
			return select({
				step: active,
				substep: activeSubstep
			}, type );
		}
		/**
		 * Select a given step
		 *
		 * @param el element to select
		 * @param type reason of changing step
		 * @return Object element selected
		 */
		function select( el, type ) {
			var substep, step, cancelSelect, target, delegated, callbackData;
			if ( $.isPlainObject( el ) ) {
				substep = el.substep;
				el = el.step;
			}
			if ( typeof el === "string" ) {
				el = jmpress.find( el ).first();
			}
			if ( !el || !$( el ).data( "stepData" ) ) {
				return false;
			}

			scrollFix.call( this );

			step = $( el ).data( "stepData" );

			cancelSelect = false;
			callCallback.call( this, "beforeChange", el, {
				stepData: step,
				reason: type,
				cancel: function() {
					cancelSelect = true;
				}
			});
			if ( cancelSelect ) {
				return undefined;
			}

			target = {};

			delegated = el;
			if ( $( el ).data( "stepData" ).delegate ) {
				delegated = ifNotEmpty(
					$( el )
						.parentsUntil( jmpress )
						.filter( settings.stepSelector )
						.filter( step.delegate )
				) ||
				ifNotEmpty( $( el ).near( step.delegate ) ) ||
				ifNotEmpty( $( el ).near( step.delegate, true ) ) ||
				ifNotEmpty( $( step.delegate, jmpress ) );
				if ( delegated ) {
					step = delegated.data( "stepData" );
				} else {
					// Do not delegate if expression not found
					delegated = el;
				}
			}
			if ( activeDelegated ) {
				callCallback.call( this, "setInactive", activeDelegated, {
					stepData: $( activeDelegated ).data( "stepData" ),
					delegatedFrom: active,
					reason: type,
					target: target,
					nextStep: delegated,
					nextSubstep: substep,
					nextStepData: step
				});
			}
			callbackData = {
				stepData: step,
				delegatedFrom: el,
				reason: type,
				target: target,
				substep: substep,
				prevStep: activeDelegated,
				prevSubstep: activeSubstep,
				prevStepData: activeDelegated && $( activeDelegated ).data( "stepData" )
			};
			callCallback.call( this, "beforeActive", delegated, callbackData );
			callCallback.call( this, "setActive", delegated, callbackData );

			// Set on step class on root element
			if ( current.jmpressClass ) {
				$( jmpress ).removeClass( current.jmpressClass );
			}
			$( jmpress ).addClass( current.jmpressClass = "step-" + $( delegated ).attr( "id" ) );
			if ( current.jmpressDelegatedClass ) {
				$( jmpress ).removeClass( current.jmpressDelegatedClass );
			}
			$( jmpress ).addClass(
				current.jmpressDelegatedClass = "delegating-step-" + $( el ).attr( "id" )
			);

			callCallback.call( this, "applyTarget", delegated, $.extend({
				canvas: canvas,
				area: area
			}, callbackData ) );

			active = el;
			activeSubstep = callbackData.substep;
			activeDelegated = delegated;

			if ( current.idleTimeout ) {
				clearTimeout( current.idleTimeout );
			}
			current.idleTimeout = setTimeout($.proxy(function() {
				callCallback.call( this, "idle", delegated, callbackData );
			}, this ), Math.max( 1, settings.transitionDuration - 100 ) );

			return delegated;
		}
		/**
		 * This should fix ANY kind of buggy scrolling
		 */
		function scrollFix() {
			(function fix() {
				if ( $( container )[ 0 ].tagName === "BODY" ) {
					try {
						window.scrollTo( 0, 0 );
					} catch ( e ) {}
				}
				$( container ).scrollTop( 0 );
				$( container ).scrollLeft( 0 );
				function check() {
					if ( $( container ).scrollTop() !== 0 || $( container ).scrollLeft() !== 0 ) {
						fix();
					}
				}
				setTimeout( check, 1 );
				setTimeout( check, 10 );
				setTimeout( check, 100 );
				setTimeout( check, 200 );
				setTimeout( check, 400 );
			}());
		}
		/**
		 * Alias for select
		 */
		function goTo( el ) {
			return select.call( this, el, "jump" );
		}
		/**
		 * Goto Next Slide
		 *
		 * @return Object newly active slide
		 */
		function next() {
			return select.call( this, callCallback.call(this, "selectNext", active, {
				stepData: $( active ).data( "stepData" ),
				substep: activeSubstep
			}), "next" );
		}
		/**
		 * Goto Previous Slide
		 *
		 * @return Object newly active slide
		 */
		function prev() {
			return select.call( this, callCallback.call(this, "selectPrev", active, {
				stepData: $( active ).data( "stepData" ),
				substep: activeSubstep
			}), "prev" );
		}
		/**
		 * Goto First Slide
		 *
		 * @return Object newly active slide
		 */
		function home() {
			return select.call( this, callCallback.call( this, "selectHome", active, {
				stepData: $( active ).data( "stepData" )
			}), "home" );
		}
		/**
		 * Goto Last Slide
		 *
		 * @return Object newly active slide
		 */
		function end() {
			return select.call( this, callCallback.call( this, "selectEnd", active, {
				stepData: $( active ).data( "stepData" )
			}), "end" );
		}
		/**
		 * Manipulate the canvas
		 *
		 * @param props
		 * @return Object
		 */
		function canvasMod( props ) {
			css( canvas, props || {} );
			return $( canvas );
		}
		/**
		 * Return current step
		 *
		 * @return Object
		 */
		function getActive() {
			return activeDelegated && $( activeDelegated );
		}
		/**
		 * fire a callback
		 *
		 * @param callbackName
		 * @param element
		 * @param eventData
		 * @return void
		 */
		function fire( callbackName, element, eventData ) {
			if ( !callbacks[ callbackName ] ) {
				$.error( "Callback " + callbackName + " is not registered." );
			} else {
				return callCallback.call( this, callbackName, element, eventData );
			}
		}

		/**
		 * PUBLIC METHODS LIST
		 */
		jmpress.data( "jmpressmethods", {
			select: select,
			reselect: reselect,
			scrollFix: scrollFix,
			goTo: goTo,
			next: next,
			prev: prev,
			home: home,
			end: end,
			canvas: canvasMod,
			container: function() {
				return container;
			},
			settings: function() {
				return settings;
			},
			active: getActive,
			current: function() {
				return current;
			},
			fire: fire,
			init: function( step ) {
				doStepInit.call( this, $( step ), current.nextIdNumber++ );
			},
			deinit: function( step ) {
				if ( step ) {
					doStepDeinit.call( this, $( step ) );
				} else {
					deinit.call( this );
				}
			},
			reapply: doStepReapply
		});

		/**
		 * Check for support
		 * This will be removed in near future, when support is coming
		 *
		 * @access protected
		 * @return void
		 */
		function checkSupport() {
			var ua = navigator.userAgent.toLowerCase();
			return ua.search( /(iphone)|(ipod)|(android)/ ) === -1 ||
				ua.search( /(chrome)/ ) !== -1;
		}

		// BEGIN INIT

		// CHECK FOR SUPPORT
		if ( checkSupport() === false || callCallback.call( this, "checkNoSupport", null, {} ) ) {
			// not supported
			if ( settings.notSupportedClass ) {
				jmpress.addClass( settings.notSupportedClass );
			}
			return;
		} else {
			if ( settings.notSupportedClass ) {
				jmpress.removeClass( settings.notSupportedClass );
			}
		}

		// grabbing all steps
		steps = $( settings.stepSelector, jmpress );

		// GERNERAL INIT OF FRAME
		container = jmpress;
		area = $( "<div />" );
		canvas = $( "<div />" );
		$( jmpress ).children().filter( steps ).each(function() {
			canvas.append( $( this ) );
		});
		if ( settings.fullscreen ) {
			container = $( "body" );
			$( "html" ).css({
				overflow: "hidden"
			});
			area = jmpress;
		}
		oldStyle.area = area.attr( "style" ) || "";
		oldStyle.container = container.attr( "style" ) || "";
		if ( settings.fullscreen ) {
			container.css({
				height: "100%"
			});
			jmpress.append( canvas );
		} else {
			container.css({
				position: "relative"
			});
			area.append( canvas );
			jmpress.append( area );
		}

		$( container ).addClass( settings.containerClass );
		$( area ).addClass( settings.areaClass );
		$( canvas ).addClass( settings.canvasClass );

		document.documentElement.style.height = "100%";
		container.css({
			overflow: "hidden"
		});

		props = {
			position: "absolute",
			transitionDuration: "0s"
		};

		props = $.extend( {}, settings.animation, props );
		css( area, props );
		css( canvas, props );

		current = {};

		callCallback.call( this, "beforeInit", null, {
			canvas: canvas,
			area: area
		});

		// INITIALIZE EACH STEP
		steps.each(function( idx ) {
			doStepInit.call( jmpress, this, idx );
		});
		current.nextIdNumber = steps.length;

		callCallback.call( this, "afterInit", null, {} );

		// START
		select.call( this,  callCallback.call( this, "selectInitialStep", "init", {} ) );

		if ( settings.initClass ) {
			$( steps ).removeClass( settings.initClass );
		}
	}
	/**
	 * Return default settings
	 *
	 * @return Object
	 */
	function getDefaults() {
		return defaults;
	}
	/**
	 * Register a callback or a jmpress function
	 *
	 * @access public
	 * @param name String the name of the callback or function
	 * @param func Function? the function to be added
	 */
	function register( name, func ) {
		if ( $.isFunction( func ) ) {
			if ( methods[ name ] ) {
				$.error( "Function " + name + " is already registered." );
			} else {
				methods[ name ] = func;
			}
		} else {
			if ( callbacks[ name ] ) {
				$.error( "Callback " + name + " is already registered." );
			} else {
				callbacks[ name ] = 1;
				defaults[ name ] = [];
			}
		}
	}
	/**
	 * Set CSS on element w/ prefixes
	 *
	 * @return Object element which properties were set
	 *
	 * TODO: Consider bypassing pfx and blindly set as jQuery
	 * already checks for support
	 */
	function css( el, props ) {
		var key, pkey, cssObj = {};
		for ( key in props ) {
			if ( props.hasOwnProperty( key ) ) {
				pkey = pfx( key );
				if ( pkey !== null ) {
					cssObj[ pkey ] = props[ key ];
				}
			}
		}
		$( el ).css( cssObj );
		return el;
	}
	/**
	 * Return dataset for element
	 *
	 * @param el element
	 * @return Object
	 */
	function dataset( el ) {
		var attrs,
			returnDataset = {};
		if ( $( el )[ 0 ].dataset ) {
			return $.extend( {}, $( el )[ 0 ].dataset );
		}
		function toCamelcase( str ) {
			str = str.split( "-" );
			for ( var i = 1; i < str.length; i++ ) {
				str[ i ] = str[ i ].substr( 0, 1 ).toUpperCase() + str[ i ].substr( 1 );
			}
			return str.join( "" );
		}
		attrs = $( el )[ 0 ].attributes;
		$.each( attrs, function( idx, attr ) {
			if ( attr.nodeName.substr( 0, 5 ) === "data-" ) {
				returnDataset[ toCamelcase( attr.nodeName.substr( 5 ) ) ] = attr.nodeValue;
			}
		});
		return returnDataset;
	}
	/**
	 * Returns true, if jmpress is initialized
	 *
	 * @return bool
	 */
	function initialized() {
		return !!$( this ).data( "jmpressmethods" );
	}

	/**
	 * PUBLIC STATIC METHODS LIST
	 */
	methods = {
		init: init,
		initialized: initialized,
		deinit: function() {},
		css: css,
		pfx: pfx,
		defaults: getDefaults,
		register: register,
		dataset: dataset
	};

	/**
	 * $.jmpress()
	 */
	$.fn.jmpress = function( method ) {
		var result,
			args = arguments;

		function f() {
			var settings, func,
				jmpressmethods = $( this ).data( "jmpressmethods" );
			if ( jmpressmethods && jmpressmethods[ method ] ) {
				return jmpressmethods[ method ].apply(
					this,
					Array.prototype.slice.call( arguments, 1 )
				);
			} else if ( methods[ method ] ) {
				return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			} else if ( callbacks[ method ] && jmpressmethods ) {
				settings = jmpressmethods.settings();
				func = Array.prototype.slice.call( arguments, 1 )[ 0 ];
				if ( $.isFunction( func ) ) {
					settings[ method ] = settings[ method ] || [];
					settings[ method ].push( func );
				}
			} else if ( typeof method === "object" || !method ) {
				return init.apply( this, arguments );
			} else {
				$.error( "Method " +  method + " does not exist on jQuery.jmpress" );
			}
			// to allow chaining
			return this;
		}

		$( this ).each(function( idx, element ) {
			result = f.apply( element, args );
		});

		return result;
	};
	$.extend({
		jmpress: function( method ) {
			if ( methods[ method ] ) {
				return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( callbacks[ method ] ) {
				// plugin interface
				var func = Array.prototype.slice.call( arguments, 1 )[ 0 ];
				if ( $.isFunction( func ) ) {
					defaults[ method ].push( func );
				} else {
					$.error(
						"Second parameter should be a function: " +
						"$.jmpress( callbackName, callbackFunction )"
					);
				}
			} else {
				$.error( "Method " +  method + " does not exist on jQuery.jmpress" );
			}
		}
	});

}( jQuery, document, window ));

/*
 * near.js
 * Find steps near each other
 */
(function( $, document, window, undefined ) {

	"use strict";

	// Add near( selector, backwards = false) to jquery

	function checkAndGo( elements, func, selector, backwards ) {
		var next;
		elements.each(function( idx, element ) {
			if ( backwards ) {
				next = func( element, selector, backwards );
				if ( next ) {
					return false;
				}
			}
			if ( $( element ).is( selector ) ) {
				next = element;
				return false;
			}
			if ( !backwards ) {
				next = func( element, selector, backwards );
				if ( next ) {
					return false;
				}
			}
		});
		return next;
	}
	function findNextInChildren( item, selector, backwards ) {
		var children = $( item ).children();
		if ( backwards ) {
			children = $( children.get().reverse() );
		}
		return checkAndGo( children, findNextInChildren, selector, backwards );
	}
	function findNextInSiblings( item, selector, backwards ) {
		return checkAndGo(
			$( item )[ backwards ? "prevAll" : "nextAll" ](),
			findNextInChildren,
			selector,
			backwards
		);
	}
	function findNextInParents( item, selector, backwards ) {
		var next,
			parents = $( item ).parents();

		parents = $( parents.get() );

		$.each( parents.get(), function( idx, element ) {
			if ( backwards && $( element ).is( selector ) ) {
				next = element;
				return false;
			}
			next = findNextInSiblings( element, selector, backwards );
			if ( next ) {
				return false;
			}
		});
		return next;
	}

	$.fn.near = function( selector, backwards ) {
		var array = [];
		$( this ).each(function( idx, element ) {
			var near = ( backwards ? false : findNextInChildren( element, selector, backwards ) ) ||
				findNextInSiblings( element, selector, backwards ) ||
				findNextInParents( element, selector, backwards );
			if ( near ) {
				array.push( near );
			}
		});
		return $( array );
	};
}( jQuery, document, window ));

/*
 * transform.js
 * The engine that powers the transforms or falls back to other methods
 */
(function( $, document, window, undefined ) {

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

}( jQuery, document, window ));

/*
 * active.js
 * Set the active classes on steps
 */
(function( $, document, window, undefined ) {

	"use strict";

	var $jmpress = $.jmpress,

		/* DEFINES */
		activeClass = "activeClass",
		nestedActiveClass = "nestedActiveClass",

		/* DEFAULTS */
		defaults = $jmpress( "defaults" );

	defaults[ nestedActiveClass ] = "nested-active";
	defaults[ activeClass ] = "active";

	/* HOOKS */
	$jmpress( "setInactive", function( step, eventData ) {
		var settings = eventData.settings,
			activeClassSetting = settings[ activeClass ],
			nestedActiveClassSettings = settings[ nestedActiveClass ];
		if ( activeClassSetting ) {
			$( step ).removeClass( activeClassSetting );
		}
		if ( nestedActiveClassSettings ) {
			$.each( eventData.parents, function( idx, element ) {
				$( element ).removeClass( nestedActiveClassSettings );
			});
		}
	});
	$jmpress( "setActive", function( step, eventData ) {
		var settings = eventData.settings,
			activeClassSetting = settings[ activeClass ],
			nestedActiveClassSettings = settings[ nestedActiveClass ];
		if ( activeClassSetting ) {
			$( step ).addClass( activeClassSetting );
		}
		if ( nestedActiveClassSettings ) {
			$.each( eventData.parents, function( idx, element ) {
				$( element ).addClass( nestedActiveClassSettings );
			});
		}
	});

}( jQuery, document, window ));

/*
 * circular.js
 * Repeat from start after end
 */
(function( $, document, window, undefined ) {

	"use strict";

	var $jmpress = $.jmpress;

	/* FUNCTIONS */
	function firstSlide( step, eventData ) {
		return $( this ).find( eventData.settings.stepSelector ).first();
	}
	function prevOrNext( jmpress, step, eventData, prev ) {
		var item, stepSelector;
		if ( !step ) {
			return false;
		}
		stepSelector = eventData.settings.stepSelector;
		step = $( step );
		do {
			item = step.near( stepSelector, prev );
			if ( item.length === 0 || item.closest( jmpress ).length === 0 ) {
				item = $( jmpress ).find( stepSelector )[ prev ? "last" : "first" ]();
			}
			if ( !item.length ) {
				return false;
			}
			step = item;
		} while ( step.data( "stepData" ).exclude );
		return step;
	}

	/* HOOKS */
	$jmpress( "initStep", function( step, eventData ) {
		eventData.stepData.exclude =
			eventData.data.exclude && [ "false", "no" ].indexOf( eventData.data.exclude ) === -1;
	});
	$jmpress( "selectInitialStep", firstSlide );
	$jmpress( "selectHome", firstSlide );
	$jmpress( "selectEnd", function( step, eventData ) {
		return $( this ).find( eventData.settings.stepSelector ).last();
	});
	$jmpress( "selectPrev", function( step, eventData ) {
		return prevOrNext( this, step, eventData, true );
	});
	$jmpress( "selectNext", function( step, eventData ) {
		return prevOrNext( this, step, eventData );
	});
}( jQuery, document, window ));

/*
 * start.js
 * Set the first step to start on
 */
(function( $, document, window, undefined ) {

	"use strict";

	/* HOOKS */
	$.jmpress( "selectInitialStep", function( nil, eventData ) {
		return eventData.settings.start;
	});

}( jQuery, document, window ));

/*
 * hash.js
 * Detect and set the URL hash
 */
(function( $, document, window, undefined ) {

	"use strict";

	var $jmpress = $.jmpress,
		hashLink = "a[href^=#]";

	/* FUNCTIONS */
	function randomString() {
		return "" + Math.round( Math.random() * 100000, 0 );
	}
	/**
	 * getElementFromUrl
	 *
	 * @return String or undefined
	 */
	function getElementFromUrl( settings ) {
		// get id from url # by removing `#` or `#/` from the beginning,
		// so both "fallback" `#slide-id` and "enhanced" `#/slide-id` will work
		// TODO SECURITY check user input to be valid!
		try {
			var el = $( "#" + window.location.hash.replace( /^#\/?/, "" ) );
			return el.length > 0 && el.is( settings.stepSelector ) ? el : undefined;
		} catch ( e ) {}
	}
	function setHash( stepid ) {
		var shouldBeHash = "#/" + stepid;
		if ( window.history && window.history.pushState ) {
			// shouldBeHash = "#" + stepid;
			// consider this for future versions
			//  it has currently issues, when startup with a link with hash (webkit)
			if ( window.location.hash !== shouldBeHash ) {
				window.history.pushState( {}, "", shouldBeHash );
			}
		} else {
			if ( window.location.hash !== shouldBeHash ) {
				window.location.hash = shouldBeHash;
			}
		}
	}

	/* DEFAULTS */
	$jmpress( "defaults" ).hash = {
		use: true,
		update: true,
		bindChange: true
		// NOTICE: {use: true, update: false, bindChange: true}
		// will cause a error after clicking on a link to the current step
	};

	/* HOOKS */
	$jmpress( "selectInitialStep", function( step, eventData ) {
		var settings = eventData.settings,
			hashSettings = settings.hash,
			current = eventData.current,
			jmpress = $( this );
		eventData.current.hashNamespace = ".jmpress-" + randomString();
		// HASH CHANGE EVENT
		if ( hashSettings.use ) {
			if ( hashSettings.bindChange ) {
				$( window ).bind( "hashchange" + current.hashNamespace, function( event ) {
					var urlItem = getElementFromUrl( settings );
					if ( jmpress.jmpress( "initialized" ) ) {
						jmpress.jmpress( "scrollFix" );
					}
					if ( urlItem && urlItem.length ) {
						if ( urlItem.attr( "id" ) !== jmpress.jmpress( "active" ).attr( "id" ) ) {
							jmpress.jmpress( "select", urlItem );
						}
						setHash( urlItem.attr( "id" ) );
					}
					event.preventDefault();
				});
				$( hashLink ).on( "click" + current.hashNamespace, function( event ) {
					var href = $( this ).attr( "href" );
					try {
						if ( $( href ).is( settings.stepSelector ) ) {
							jmpress.jmpress( "select", href );
							event.preventDefault();
							event.stopPropagation();
						}
					} catch ( e ) {}
				});
			}
			return getElementFromUrl( settings );
		}
	});
	$jmpress( "afterDeinit", function( nil, eventData ) {
		$( hashLink ).off( eventData.current.hashNamespace );
		$( window ).unbind( eventData.current.hashNamespace );
	});
	$jmpress( "setActive", function( step, eventData ) {
		var settings = eventData.settings,
			current = eventData.current;
		// `#/step-id` is used instead of `#step-id` to prevent default browser
		// scrolling to element in hash
		if ( settings.hash.use && settings.hash.update ) {
			clearTimeout( current.hashtimeout );
			current.hashtimeout = setTimeout(function() {
				setHash( $( eventData.delegatedFrom ).attr( "id" ) );
			}, settings.transitionDuration + 200 );
		}
	});

}( jQuery, document, window ));

/*
 * mobile.js
 * Adds support for swipe on touch supported browsers
 */
(function( $, document, window, undefined ) {

	"use strict";

	var $jmpress = $.jmpress;

	/* FUNCTIONS */
	function randomString() {
		return "" + Math.round( Math.random() * 100000, 0 );
	}

	/* HOOKS */
	$jmpress( "afterInit", function( step, eventData ) {
		var data, start,
			settings = eventData.settings,
			current = eventData.current,
			jmpress = eventData.jmpress;
		current.mobileNamespace = ".jmpress-" + randomString();
		start = [ 0, 0 ];
		$( settings.fullscreen ? document : jmpress )
		.bind( "touchstart" + current.mobileNamespace, function( event ) {

			data = event.originalEvent.touches[ 0 ];
			start = [ data.pageX, data.pageY ];

		}).bind( "touchmove" + current.mobileNamespace, function( event ) {
			data = event.originalEvent.touches[ 0 ];
			event.preventDefault();
			return false;
		}).bind( "touchend" + current.mobileNamespace, function( event ) {
			var end = [ data.pageX, data.pageY ],
				diff = [ end[ 0 ] - start[ 0 ], end[ 1 ] - start[ 1 ] ];

			if ( Math.max( Math.abs( diff[ 0 ] ), Math.abs( diff[ 1 ] ) ) > 50 ) {
				diff = Math.abs( diff[ 0 ] ) > Math.abs( diff[ 1 ] ) ? diff[ 0 ] : diff[ 1 ];
				$( jmpress ).jmpress( diff > 0 ? "prev" : "next" );
				event.preventDefault();
				return false;
			}
		});
	});
	$jmpress( "afterDeinit", function( nil, eventData ) {
		var settings = eventData.settings,
			current = eventData.current,
			jmpress = eventData.jmpress;
		$( settings.fullscreen ? document : jmpress ).unbind( current.mobileNamespace );
	});

}( jQuery, document, window ));

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