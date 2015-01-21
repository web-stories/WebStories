/*
 * Custom configuration for story viewer using jmpress plugin structure
 */
define( [ "jquery", "jmpress/core", "jmpress/viewport", "jmpress/near" ], function( $ ) {
	"use strict";
	
	function firstSlide( step, eventData ) {
		return $( this ).find( eventData.settings.stepSelector ).first();
	}
	
	// VIEWPORT
	// A viewport config is necessary to enable auto resize of the content on window resize
	$.jmpress( "beforeActive", function( step, eventData ) {
		eventData.stepData.viewPortWidth = 1000;
	});
	
	// CUSTOM FLOW
	$.jmpress( "selectInitialStep", firstSlide );
	$.jmpress( "selectHome", firstSlide );
	$.jmpress( "selectEnd", function( step, eventData ) {
		return $( this ).find( eventData.settings.stepSelector ).last();
	});
	$.jmpress( "selectPrev", function( step, eventData ) {
		return $( step ).near( eventData.settings.stepSelector, true /* prev */ );
	});
	$.jmpress( "selectNext", function( step, eventData ) {
		return $( step ).near( eventData.settings.stepSelector );
	});
});
