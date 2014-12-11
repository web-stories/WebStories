require( [ "jquery", "jquery.ws.story" ], function( $ ) {
	"use strict";
	$( ".story" ).story({
		loaded: function() {
			$( ".loading-dots" ).hide();
		}
	});
});
