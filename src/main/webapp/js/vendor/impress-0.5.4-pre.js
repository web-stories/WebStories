/**
 * impress.js
 *
 * impress.js is a presentation tool based on the power of CSS3 transforms and transitions
 * in modern browsers and inspired by the idea behind prezi.com.
 *
 *
 * Copyright 2011-2014 Bartek Szopka (@bartaz)
 *
 * Released under the MIT and GPL Licenses.
 *
 * ------------------------------------------------
 * author: Bartek Szopka
 * version: 0.5.4-pre
 * url: http://bartaz.github.com/impress.js/
 * source: http://github.com/bartaz/impress.js/
 */

(function( factory, document, window ) {
	if ( typeof define === "function" && define.amd ) {
		define( factory );
	} else {
		window.impress = factory();
	}
}(function() {
	"use strict";
// You are one of those who like to know how things work inside?
// Let me show you the cogs that make impress.js run...

// HELPER FUNCTIONS

// Takes a standard CSS property name as a parameter and returns it's prefixed version, valid for
// current browser it runs in.
// The code is heavily inspired by Modernizr http://www.modernizr.com/
var prefixed = (function() {

	var style = document.createElement( "dummy" ).style;
	var prefixes = "Webkit Moz O ms Khtml".split( " " );
	var memory = {};

	return function( prop ) {
		if ( typeof memory[ prop ] === "undefined" ) {

			var ucProp = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 );
			var props = ( prop + " " + prefixes.join( ucProp + " " ) + ucProp ).split( " " );

			memory[ prop ] = null;
			for ( var i in props ) {
				if ( style[ props[ i ] ] !== undefined ) {
					memory[ prop ] = props[i];
					break;
				}
			}

		}

		return memory[ prop ];
	};

}());

// Takes an array-like object and turns it into real Array to make all the Array.prototype goodness
// available.
var arrayify = function( a ) {
	return [].slice.call( a );
};

// Applies the styles given in `props` object to the element given as `element`.
// It runs all property names through `prefixed` function to make sure proper prefixed version of
// the property is used.
var css = function( element, props ) {
	var key, prefixedKey;
	for ( key in props ) {
		if ( !props.hasOwnProperty( key ) ) {
			continue;
		}
		prefixedKey = prefixed( key );
		if ( prefixedKey !== null ) {
			element.style[ prefixedKey ] = props[ key ];
		}
	}
	return element;
};

// Takes a value given as `numeric` parameter and tries to turn it into a number. If it is not
//possible it returns 0 (or other value given as `fallback`).
var toNumber = function( numeric, fallback ) {
	return isNaN( numeric ) ? ( fallback || 0 ) : Number( numeric );
};

// Returns element with given `id`.
var getElementById = function( id ) {
	return document.getElementById( id );
};

// Return an array of elements for the given CSS `selector` in the `context` of the given element
// or whole document.
var $ = function( selector, context ) {
	context = context || document;
	return arrayify( context.querySelectorAll( selector ) );
};

// Builds a custom DOM event with the given `eventName` and `data`, then triggers it on `element`.
var triggerEvent = function( element, eventName, data ) {
	var event = document.createEvent( "CustomEvent" );
	event.initCustomEvent( eventName, true, true, data );
	element.dispatchEvent( event );
};

// Builds a translate transform string for the given data.
var translate = function( data ) {
	return " translate3d(" + data.x + "px," + data.y + "px," + data.z + "px) ";
};

// Builds a rotate transform string for given data.
// By default the rotations are in X Y Z order, that can be reverted by passing `true` as second
// parameter.
var rotate = function( data, revert ) {
	var x = " rotateX(" + data.x + "deg) ";
	var y = " rotateY(" + data.y + "deg) ";
	var z = " rotateZ(" + data.z + "deg) ";

	return revert ? z + y + x : x + y + z;
};

// Builds a scale transform string for given data.
var scale = function( value ) {
	return " scale(" + value + ") ";
};

// Builds a perspective transform string for given data.
var perspective = function( value ) {
	return " perspective(" + value + "px) ";
};

// Returns an element located by id from hash part of window location.
var getElementFromHash = function() {
	// Get id from url # (hash) by removing `#` or `#/` from the beginning.
	// The `#/` pattern can be used to avoid flickering in safari and IE.
	return getElementById( window.location.hash.replace( /^#\/?/, "" ) );
};

// Counts the scale factor between window size and size defined for the presentation in the config.
var computeWindowScale = function( config ) {
	var hScale = window.innerHeight / config.height;
	var wScale = window.innerWidth / config.width;
	var scale = hScale > wScale ? wScale : hScale;

	if ( config.maxScale && scale > config.maxScale ) {
		scale = config.maxScale;
	}

	if ( config.minScale && scale < config.minScale ) {
		scale = config.minScale;
	}

	return scale;
};

// CHECK SUPPORT

var body = document.body;
var ua = navigator.userAgent.toLowerCase();
var impressSupported =
	// Browser should support CSS 3D transforms.
	( prefixed( "perspective" ) !== null ) &&

	// Should also support `classList` and `dataset` APIs
	( body.classList ) &&
	( body.dataset ) &&

	// Some mobile devices need to be blacklisted, because their CSS 3D support or hardware is not
	// good enough to run impress.js properly, sorry...
	( ua.search( /(iphone)|(ipod)|(android)/ ) === -1 );

if ( !impressSupported ) {
	// We can't be sure that `classList` is supported.
	body.className += " impress-not-supported ";
} else {
	body.classList.remove( "impress-not-supported" );
	body.classList.add( "impress-supported" );
}

// GLOBALS AND DEFAULTS

// This is where the root elements of all impress.js instances will be kept.
// Yes, this means you can have more than one instance on a page, but I"m not
// sure if it makes any sense in practice ;)
var roots = {};

// Some default config values.
var defaults = {
	width: 1024,
	height: 768,
	maxScale: 1,
	minScale: 0,

	perspective: 1000,

	transitionDuration: 1000
};

// Tt's just an empty function... and a useless comment.
var empty = function() {};

// IMPRESS.JS API

// And that's where interesting things will start to happen.
// It's the core `impress` function that returns the impress.js API for a presentation based on
// the element with given id ("impress" by default).
//
// If a DOM element is specified, it uses that element instead of searching for the id.
var impress = function( argument ) {
	var rootId;

	// If impress.js is not supported by the browser, return a dummy API.
	// It may not be a perfect solution but we return early and avoid running code that may use
	// features not implemented in the browser.
	if ( !impressSupported ) {
		return {
			init: empty,
			goto: empty,
			prev: empty,
			next: empty
		};
	}

	// Find the element root id
	if ( typeof argument === "string" ) {
		rootId = argument;
	} else if ( argument && "nodeType" in argument ) {
		rootId = argument.id;
	}
	rootId = rootId || "impress";

	// If given root is already initialized, just return the API.
	if ( roots[ "impress-root-" + rootId ] ) {
		return roots[ "impress-root-" + rootId ];
	}

	// Internal information of each presentation step.
	var stepsData = {};

	// Element of currently active step.
	var activeStep = null;

	// Current state (position, rotation and scale) of the presentation.
	var currentState = null;

	// Array of step elements.
	var steps = null;

	// Configuration options.
	var config = null;

	// Scale factor of the browser window.
	var windowScale = null;

	// Root presentation elements.
	var root = getElementById( rootId );
	var canvas = document.createElement( "div" );

	var initialized = false;

	// STEP EVENTS
	//
	// There are currently two step events triggered by impress.js:
	// * `impress:stepenter` is triggered when the step is shown on the screen (the transition
	// from the previous one is finished).
	// * `impress:stepleave` is triggered when the step is left (the transition to next step
	// just starts).

	var lastEntered = null;

	// Called whenever the step element is entered, but the event is triggered only if the step is
	// different than the last entered step.
	var onStepEnter = function( step ) {
		if ( lastEntered !== step ) {
			triggerEvent( step, "impress:stepenter" );
			lastEntered = step;
		}
	};

	// Called whenever the step element is left, but the event is triggered only if the step is
	// the same as last entered step.
	var onStepLeave = function( step ) {
		if ( lastEntered === step ) {
			triggerEvent( step, "impress:stepleave" );
			lastEntered = null;
		}
	};

	// Initializes given step element by reading data from its data attributes and setting correct
	// styles.
	var initStep = function( element, index ) {
		var data = element.dataset;
		var step = {
			translate: {
				x: toNumber( data.x ),
				y: toNumber( data.y ),
				z: toNumber( data.z )
			},
			rotate: {
				x: toNumber( data.rotateX ),
				y: toNumber( data.rotateY ),
				z: toNumber( data.rotateZ || data.rotate )
			},
			scale: toNumber( data.scale, 1 )
		};

		if ( !element.id ) {
			element.id = "step-" + ( index + 1 );
		}

		stepsData[ "impress-" + element.id ] = step;

		css( element, {
			position: "absolute",
			transform: "translate(-50%,-50%)" +
				translate( step.translate ) +
				rotate( step.rotate ) +
				scale( step.scale ),
			transformStyle: "preserve-3d"
		});
	};

	// API function that initializes (and run) the presentation.
	var init = function() {
		if ( initialized ) {
			return;
		}

		// First we set up the viewport for mobile devices.
		// For some reason, iPad goes nuts when it is not done properly.
		var meta = $( "meta[name='viewport']" )[ 0 ] || document.createElement( "meta" );
		meta.content = [
			"width=device-width",
			"minimum-scale=1",
			"maximum-scale=1",
			"user-scalable=no"
		].join( ", " );
		if ( meta.parentNode !== document.head ) {
			meta.name = "viewport";
			document.head.appendChild( meta );
		}

		// Initialize configuration object.
		var rootData = root.dataset;
		config = {
			width: toNumber( rootData.width, defaults.width ),
			height: toNumber( rootData.height, defaults.height ),
			maxScale: toNumber( rootData.maxScale, defaults.maxScale ),
			minScale: toNumber( rootData.minScale, defaults.minScale ),
			perspective: toNumber( rootData.perspective, defaults.perspective ),
			transitionDuration: toNumber(
				rootData.transitionDuration, defaults.transitionDuration
			)
		};

		windowScale = computeWindowScale( config );

		// Wrap steps with a container element.
		arrayify( root.childNodes ).forEach(function( el ) {
			canvas.appendChild( el );
		});
		root.appendChild( canvas );

		// Set initial styles.
		document.documentElement.style.height = "100%";

		css( body, {
			height: "100%",
			overflow: "hidden"
		});

		var rootStyles = {
			position: "absolute",
			transformOrigin: "top left",
			transition: "all 0s ease-in-out",
			transformStyle: "preserve-3d"
		};

		css( root, rootStyles );
		css( root, {
			top: "50%",
			left: "50%",
			transform: perspective( config.perspective / windowScale ) + scale( windowScale )
		});
		css( canvas, rootStyles );

		body.classList.remove( "impress-disabled" );
		body.classList.add( "impress-enabled" );

		// Get and init steps.
		steps = $( ".step", root );
		steps.forEach( initStep );

		// Set a default initial state of the canvas.
		currentState = {
			translate: {
				x: 0,
				y: 0,
				z: 0
			},
			rotate:	{
				x: 0,
				y: 0,
				z: 0
			},
			scale: 1
		};

		initialized = true;

		triggerEvent( root, "impress:init", {
			api: roots[ "impress-root-" + rootId ]
		});
	};

	// Helper function that returns a step element according to the parameter:
	// * If a number is given, step with index given by the number is returned.
	// * If a string is given, step element with such id is returned.
	// * If DOM element is given, it is returned if it is a valid step element.
	var getStep = function( step ) {
		if ( typeof step === "number" ) {
			step = step < 0 ? steps[ steps.length + step] : steps[ step ];
		} else if ( typeof step === "string" ) {
			step = getElementById( step );
		}
		return step && step.id && stepsData[ "impress-" + step.id ] ? step : null;
	};

	// Used to reset timeout for `impress:stepenter` event.
	var stepEnterTimeout = null;

	// API function that moves to step according to the `argument` parameter (by step index, id
	// or element), with a transition `duration` optionally given as second parameter.
	var goto = function( argument, duration ) {
		var element = getStep( argument );

		// Presentation not initialized or given element is not a step.
		if ( !initialized || !element ) {
			return false;
		}

		// Sometimes it's possible to trigger focus on first link with some keyboard action.
		// Browser in such a case tries to scroll the page to make this element visible
		// (even that body overflow is set to hidden) and it breaks our careful positioning.
		//
		// So, as a lousy (and lazy) workaround we will make the page scroll back to the top
		// whenever slide is selected
		//
		// If you are reading this and know any better way to handle it, I'll be glad to hear
		// about it!
		//
		// TODO See exactly what this is about. Does it still occurs in modern browsers?
		window.scrollTo( 0, 0 );

		var step = stepsData[ "impress-" + element.id ];

		if ( activeStep ) {
			activeStep.classList.remove( "active" );
			body.classList.remove( "impress-on-" + activeStep.id );
		}
		element.classList.add( "active" );

		body.classList.add( "impress-on-" + element.id );

		// Compute target state of the canvas container based on the given step.
		var target = {
			rotate: {
				x: -step.rotate.x,
				y: -step.rotate.y,
				z: -step.rotate.z
			},
			translate: {
				x: -step.translate.x,
				y: -step.translate.y,
				z: -step.translate.z
			},
			scale: 1 / step.scale
		};

		// Check if the transition is zooming in or not.
		//
		// This information is used to alter the transition style: when we are zooming in - we
		// start with move and rotate transition and the scaling is delayed, but when we are
		// zooming out we start with scaling down and move and rotation are delayed.
		var zoomin = target.scale >= currentState.scale;

		// If a duration was specified, use that, otherwise use the step data attribute.
		var stepData = element.dataset;
		if ( arguments.length > 1 ) {
			duration = toNumber( duration, config.transitionDuration );
		} else {
			duration = toNumber( stepData.transitionDuration, config.transitionDuration );
		}

		var delay = duration / 2;

		// If the same step is re-selected, force computing window scaling, because it is likely
		// to be caused by window resize.
		if ( element === activeStep ) {
			windowScale = computeWindowScale( config );
		}

		var targetScale = target.scale * windowScale;

		// Trigger leave of currently active element (if it's not the same step again).
		if ( activeStep && activeStep !== element ) {
			onStepLeave( activeStep );
		}

		// Now we alter transforms of `root` and `canvas` to trigger transitions.
		//
		// And here is why there are two elements `root` and `canvas`: they are being animated
		// separately.
		// `root` is used for scaling and `canvas` for translate and rotations.
		// Transitions on them are triggered with different delays (to make visually nice and
		// "natural" looking transitions), so we need to know that both of them are finished.
		css( root, {
			// To keep the perspective look similar for different scales, we need to "scale" the
			// perspective, too.
			transform: perspective( config.perspective / targetScale ) + scale( targetScale ),
			transitionDuration: duration + "ms",
			transitionDelay: ( zoomin ? delay : 0 ) + "ms"
		});

		css( canvas, {
			transform: rotate( target.rotate, true ) + translate( target.translate ),
			transitionDuration: duration + "ms",
			transitionDelay: ( zoomin ? 0 : delay ) + "ms"
		});

		// Here is a tricky part...
		//
		// If there is no change in scale or no change in rotation and translation, it means
		// there was actually no delay - because there was no transition on `root` or `canvas`
		// elements. We want to trigger `impress:stepenter` event in the correct moment, so
		// here we compare the current and target values to check if delay should be taken into
		// account.
		//
		// I know that this `if` statement looks scary, but it's pretty simple when you know
		// what is going on - it's simply comparing all the values.
		if ( currentState.scale === target.scale || (
			currentState.rotate.x === target.rotate.x &&
			currentState.rotate.y === target.rotate.y &&
			currentState.rotate.z === target.rotate.z &&
			currentState.translate.x === target.translate.x &&
			currentState.translate.y === target.translate.y &&
			currentState.translate.z === target.translate.z
		)) {
			delay = 0;
		}

		// Store current state.
		currentState = target;
		activeStep = element;

		// And here is where we trigger `impress:stepenter` event.
		// We simply set up a timeout to fire it taking transition duration (and possible delay)
		// into account.
		//
		// I really wanted to make it in more elegant way. The `transitionend` event seemed to
		// be the best way to do it, but the fact that I'm using transitions on two separate
		// elements and that the `transitionend` event is only triggered when there was a
		// transition (change in the values) caused some bugs and made the code really
		// complicated, cause I had to handle all the conditions separately. And it still
		// needed a `setTimeout` fallback for the situations when there is no transition at all.
		// So I decided that I'd rather make the code simpler than use shiny new `transitionend`.
		//
		// If you want learn something interesting and see how it was done with
		// `transitionend` go back to version 0.5.2 of impress.js:
		// http://github.com/bartaz/impress.js/blob/0.5.2/js/impress.js
		window.clearTimeout( stepEnterTimeout );
		stepEnterTimeout = window.setTimeout(function() {
			onStepEnter( activeStep );
		}, duration + delay );

		return element;
	};

	// API function that goes to the previous step (in document order).
	var prev = function() {
		var prev = steps.indexOf( activeStep ) - 1;
		prev = prev >= 0 ? steps[ prev ] : steps[ steps.length - 1  ];

		return goto( prev );
	};

	// API function that goes to the next step (in document order)
	var next = function() {
		var next = steps.indexOf( activeStep ) + 1;
		next = next < steps.length ? steps[ next ] : steps[ 0 ];

		return goto( next );
	};

	// Adding some useful classes to step elements.
	//
	// All the steps that have not been shown yet are given `future` class.
	// When the step is entered the `future` class is removed and the `present` class is given.
	// When the step is left `present` class is replaced with `past` class.
	//
	// So every step element is always in one of three possible states:
	// `future`, `present` or `past`.
	//
	// Those classes can be used in CSS to style different types of steps.
	// For example the `present` class can be used to trigger some custom
	// animations when step is shown.
	root.addEventListener( "impress:init", function() {
		steps.forEach(function( step ) {
			step.classList.add( "future" );
		});

		root.addEventListener( "impress:stepenter", function( event ) {
			event.target.classList.remove( "past" );
			event.target.classList.remove( "future" );
			event.target.classList.add( "present" );
		});

		root.addEventListener( "impress:stepleave", function( event ) {
			event.target.classList.remove( "present" );
			event.target.classList.add( "past" );
		});
	});

	// Adding hash change support.
	root.addEventListener( "impress:init", function() {

		// Last hash detected.
		var lastHash = "";

		// Update the hash in the address bar.
		//
		// To avoid flickering in safari and IE (because of the native hash behavior) we
		// temporarily remove the element id and add it back after the URL is updated.
		root.addEventListener( "impress:stepenter", function( event ) {
			var element = getElementById( event.target.id );
			var id = element.id;
			element.removeAttribute( "id" );
			window.location.hash = lastHash = "#" + id;
			element.setAttribute( "id", id );
		});

		// Prevent default hash jump when loading the page.
		// There is still some flickering on safari and IE, but for the first page loading that's
		// acceptable.
		window.onscroll = function( event ) {
			window.scrollTo( 0, 0 );
		};

		window.addEventListener( "hashchange", function( event ) {
			// When the step is entered, the hash in the location is updated
			// (just few lines above from here), so the hash change is triggered and we would
			// call `goto` again on the same element.
			//
			// To avoid this we store the last entered hash and compare.
			if ( window.location.hash !== lastHash ) {
				goto( getElementFromHash() );
			}
		});

		// Start the step defined in url or first step of the presentation.
		goto( getElementFromHash() || steps[ 0 ], 0 );
	});

	body.classList.add( "impress-disabled" );

	// Store and return the API for given impress.js root element.
	return (roots[ "impress-root-" + rootId ] = {
		init: init,
		goto: goto,
		next: next,
		prev: prev
	});

};

// Flag that can be used in JS to check if browser have passed the support test.
impress.supported = impressSupported;
	return impress;
}, document, window ));

// THAT'S ALL FOLKS!
//
// Thanks for reading it all.
// Or thanks for scrolling down and reading the last part.
//
// I've learnt a lot when building impress.js and I hope this code and comments
// will help somebody learn at least some part of it.
