/*
 * start.js
 * Set the first step to start on
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "./core" ], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

	"use strict";

	/* HOOKS */
	$.jmpress( "selectInitialStep", function( nil, eventData ) {
		return eventData.settings.start;
	});
}));
