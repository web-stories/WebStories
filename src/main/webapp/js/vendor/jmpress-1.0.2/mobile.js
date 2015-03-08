/*
 * mobile.js
 * Adds support for swipe on touch supported browsers
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "./core" ], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

	"use strict";

	function randomString() {
		return "" + Math.round( Math.random() * 100000, 0 );
	}

	$.jmpress( "afterInit", function( step, eventData ) {
		var touchData,
			startSwipe = 0;
		eventData.current.mobileNamespace = ".jmpress-" + randomString();
		$( eventData.settings.fullscreen ? document : eventData.jmpress )
		.bind( "touchstart" + eventData.current.mobileNamespace, function( event ) {
			touchData = event.originalEvent.touches[ 0 ];
			startSwipe = touchData.pageX;
		}).bind( "touchmove" + eventData.current.mobileNamespace, function( event ) {
			var horizontalDiff, verticalDiff,
				previousX = touchData.pageX;
			touchData = event.originalEvent.touches[ 0 ];
			horizontalDiff = Math.abs( Math.abs( previousX ) - Math.abs( touchData.pageX ) );
			// Do not prevent the behavior for vertical scroll, but prevent the horizontal to avoid
			// scrolling pass the overflow.
			if ( horizontalDiff > 0 ) {
				return false;
			}
		}).bind( "touchend" + eventData.current.mobileNamespace, function( event ) {
			var referenceDiff,
				endSwipe = touchData.pageX,
				hDiff = endSwipe - startSwipe;
			if ( Math.abs( hDiff ) > 50 ) {
				$( eventData.jmpress ).jmpress( hDiff > 0 ? "prev" : "next" );
				event.preventDefault();
				return false;
			}
		});
	});

	$.jmpress( "afterDeinit", function( nil, eventData ) {
		$( eventData.settings.fullscreen ? document : eventData.jmpress )
			.unbind( eventData.current.mobileNamespace );
	});
}));
