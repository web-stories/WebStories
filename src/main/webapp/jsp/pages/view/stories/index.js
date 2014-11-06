require( ["jquery", "jquery.ws.story"], function( $ ) {
	"use strict";
	
	var isDebug = function() {
		return window.location.href.indexOf( "?debug" ) !== -1;
	};
	
	if ( isDebug() ) {
		$( "body" )
			.removeClass( "impress-supported" )
			.addClass( "impress-not-supported" );
	}
	
	if ( $( ".impress-supported" ).length ) {
		$( ".story" ).story();
	}
});
