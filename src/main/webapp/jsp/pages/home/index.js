require( ["jquery", "bootstrap", "bootstrap.wizard"], function( $ ) {
	var nostory = $( "#meta" ).data( "nostory" ) === true;
	var modal = $( "#new-story-wizard-modal" ).modal({
		show: nostory,
		backdrop: "static"
	});
	$( "#new-story-wizard" ).wizard({
		finish: function() {
			modal.modal( "hide" );
		},
		jump: function() {
			modal.modal( "hide" );
		}
	});
});

require( ["jquery"], function( $ ) {
	$( "#story-summary" ).keyup(function() {
		var remaining = 140 - $( this ).val().length;
		$( ".remaining-chars" ).text( remaining );
	});
});