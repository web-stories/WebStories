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
