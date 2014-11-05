require( ["jquery", "jquery.ws.story"], function( $ ) {
	"use strict";
	if ( $( ".impress-supported" ).length ) {
		$( ".story" ).story();
	}
});
