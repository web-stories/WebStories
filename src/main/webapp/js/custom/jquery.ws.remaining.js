define( ["jquery", "jquery.ui.widget"], function( $ ) {
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
});