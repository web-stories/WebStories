require( ["jquery", "jquery.validate.extend", "bootstrap.wizard"], function( $ ) {
	var form = document.wizardForm;
	var validate = $( form ).validate();
	var nostory = $( "#meta" ).data( "nostory" ) === true;
	var modal = $( "#first-story-wizard-modal" ).modal({
		show: nostory,
		keyboard: false,
		backdrop: "static"
	});
	$( "#first-story-wizard" ).wizard({
		finish: function() {
			form.submit();
		},
		jump: function() {
			modal.modal( "hide" );
		},
		beforeNext: function() {
			return validate.form();
		}
	});
});

require( ["jquery"], function( $ ) {
	$( "#story-summary" ).keyup(function() {
		var remaining = 140 - $( this ).val().length;
		$( ".remaining-chars" ).text( remaining );
	});
});