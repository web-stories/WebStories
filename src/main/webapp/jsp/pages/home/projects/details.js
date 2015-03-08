require( ["jquery", "jquery.ws.remaining"], function( $ ) {
	"use strict";
	$( ".remaining" ).remaining({
		limit: 140
	});
});

require( ["jquery", "jquery.validate.extend"], function( $ ) {
	"use strict";
	$( document.metaForm ).validate();
});

require( ["jquery"], function( $ ) {
	"use strict";
	var replaceLF = function() {
		var text = $( this ).val();
		text = text.split( "\n" ).join( " " );
		$( this ).val( text );
	};
	$( ".details-meta-summary" ).on({
		keyup: replaceLF,
		keydown: replaceLF
	});
});

// Make sure use knows it has to be saved on mobile devices portrait
// In portrait the save button is hidden in the bottom
require( ["jquery"], function( $ ) {
	"use strict";
	$( "#details-meta-synopsis, #details-meta-title, #details-meta-summary" )
		.on( "keyup", function() {
			$( ".save-reminder" ).show();
		});
});
