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
