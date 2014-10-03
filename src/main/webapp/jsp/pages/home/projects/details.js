require( ["jquery", "jquery.ws.remaining"], function( $ ) {
	$( ".remaining" ).remaining({
		limit: 140
	});
});

require( ["jquery", "jquery.validate.extend"], function( $ ) {
	$( document.metaForm ).validate();
});