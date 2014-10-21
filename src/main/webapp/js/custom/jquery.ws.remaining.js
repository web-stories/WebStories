define( ["jquery", "jquery.ui.widget"], function( $ ) {
	"use strict";
	$.widget( "ws.remaining", {
		options: {
			limit: 140
		},
		_create: function() {
			this._input = this.element.find( ".remaining-input" );
			this._on( this._input, {
				"keyup": this._updateText
			});
			// Consider when field is not empty prior to initialization
			this._updateText(); 
		},
		_updateText: function() {
			var remaining = this.options.limit - this._input.val().length;
			this.element.find( ".remaining-chars" )
				.text( remaining );
		}
	});
});
