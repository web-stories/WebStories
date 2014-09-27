require( ["jquery", "bootstrap", "bootstrap.wizard"], function( $ ) {
	$( ".wizard" ).wizard({
		finish: function() {
			alert( "finished!" );
		}
	});
});