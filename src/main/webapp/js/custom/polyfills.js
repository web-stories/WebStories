// Support:
// * PhantomJS
if ( !Function.prototype.bind ) {
	Function.prototype.bind = function( oThis ) {
		"use strict";
		if ( typeof this !== "function" ) {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError(
				"Function.prototype.bind - what is trying to be bound is not callable"
			);
		}
		var aArgs = Array.prototype.slice.call( arguments, 1 ),
			fToBind = this,
			NOP = function() {},
			fBound	= function() {
				return fToBind.apply(
					this instanceof NOP && oThis ? this : oThis,
					aArgs.concat( Array.prototype.slice.call( arguments ) )
				);
			};
		NOP.prototype = this.prototype;
		fBound.prototype = new NOP();
		return fBound;
	};
}

// Support:
// * "console.log" is not spec compliant (http://stackoverflow.com/a/14086700/1400037)
(function() {
	"use strict";
	var method;
	var noop = function() {};
	var methods = [
		"assert", "clear", "count", "debug", "dir", "dirxml", "error",
		"exception", "group", "groupCollapsed", "groupEnd", "info", "log",
		"markTimeline", "profile", "profileEnd", "table", "time", "timeEnd",
		"timeline", "timelineEnd", "timeStamp", "trace", "warn"
	];
	var length = methods.length;
	var console = ( window.console = window.console || {} );
	
	while ( length-- ) {
		method = methods[ length ];
		
		// Only stub undefined methods.
		if ( !console[ method ] ) {
			console[ method ] = noop;
		}
	}
}());
