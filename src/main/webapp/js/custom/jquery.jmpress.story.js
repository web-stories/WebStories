/*
 * Custom configuration for story viewer using jmpress plugin structure
 */
define( [ "jquery", "jmpress/core", "jmpress/viewport" ], function( $ ) {
	"use strict";
	$.jmpress( "beforeActive", function( step, eventData ) {
		eventData.stepData.viewPortWidth = 1000;
	});
});
