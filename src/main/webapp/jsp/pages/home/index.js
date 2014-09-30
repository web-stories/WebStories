require( ["jquery", "jquery.validate.extend", "bootstrap.wizard"], function( $ ) {
	var form = document.firstStoryForm;
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

require( ["jquery", "jquery.validate.extend", "bootstrap.wizard"], function( $ ) {
	var form = document.newStoryForm;
	var validate = $( form ).validate();
	var modal = $( "#new-story-wizard-modal" ).modal({
		show: false,
		backdrop: "static"
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
	$( "#new-story-btn" ).click(function() {
		modal.modal( "show" );
	});
});

require( ["jquery", "jquery.ui.widget"], function( $ ) {
	$.widget( "ws.remaining", {
		options: {
			limit: 140
		},
		_create: function() {
			this._textarea = this.element.find( ".remaining-input" );
			this._on( this._textarea, {
				"keyup": this._type
			});
		},
		_type: function() {
			var remaining = this.options.limit - this._textarea.val().length;
			this.element.find( ".remaining-chars" )
				.text( remaining );
		}
	});
	$( ".remaining" ).remaining({
		limit: 140
	});
});