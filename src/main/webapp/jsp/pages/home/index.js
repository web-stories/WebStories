require( ["jquery", "bootstrap", "bootstrap.wizard"], function( $ ) {
	$( "#new-story-wizard-modal" ).modal();
	$( "#new-story-wizard" ).wizard({
		finish: function() {
			alert( "finished!" );
		}
	});
});