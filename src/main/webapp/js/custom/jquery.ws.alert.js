define( ["jquery", "jquery.ui.widget", "bootstrap"], function( $ ) {
	"use strict";
	$.widget( "ws.fixedAlert", {
		_init: function() {
			this.open();
		},
		open: function() {
			this._opened = true;
		},
		close: function() {
			function closed( event ) {
				this._opened = false;
			}
			this.element
				.removeClass( "in" )
				.one( "bsTransitionEnd", closed.bind( this ) )
				.emulateTransitionEnd( 150 );
		}
	});
});
