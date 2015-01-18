define( [ "jquery", "jquery.jmpress.core", "jquery.jmpress.viewport" ], function( $ ) {
	"use strict";

	// Update the size of each step
	$.jmpress( "afterInit", function( nil, eventData ) {
		$( window ).bind( "resize" + eventData.current.viewPortNamespace, function() {
			$( eventData.jmpress )
				.find( eventData.settings.stepSelector )
				.each(function( index, step ) {
					updateStep( step );
				});
		});
	});
	$.jmpress( "applyStep", function( step, eventData ) {
		updateStep( step );
	});
	function updateStep( step ) {
		$( step ).width( $( ".container" ).width() );
	}

	$.jmpress( "beforeActive", function( step, eventData ) {
		eventData.stepData.viewPortWidth = $( ".container" ).width();
	});
});
