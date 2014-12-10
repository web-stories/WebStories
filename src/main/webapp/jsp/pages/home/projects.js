require([
	"jquery",
	"jquery.validate.extend",
	"bootstrap.wizard",
	"jquery.ws.remaining"
], function( $ ) {
	"use strict";
	var form = document.newStoryForm;
	var validate = $( form ).validate();
	var nostory = $( "#meta" ).data( "nostory" ) === true;
	var modal = $( "#new-story-wizard-modal" ).modal({
		show: nostory,
		backdrop: "static"
	});
	
	$( ".remaining" ).remaining({
		limit: 140
	});
	
	$( "#new-story-wizard" ).wizard({
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
	
	$( ".create-story" ).click(function( event ) {
		modal.modal( "show" );
		// In case this is a link
		event.preventDefault();
	});
});

require( ["jquery", "jquery.ws.remaining"], function( $ ) {
	"use strict";
	$( ".remaining" ).remaining({
		limit: 140
	});
});
