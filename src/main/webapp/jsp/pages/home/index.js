require( ["jquery", "bootstrap", "bootstrap.wizard"], function( $ ) {
	var nostory = $( "#meta" ).data( "nostory" ) === true;
	var modal = $( "#new-story-wizard-modal" ).modal({
		show: nostory
	});
	$( "#new-story-wizard" ).wizard({
		finish: function() {
			modal.modal( "hide" );
		}
	});
});