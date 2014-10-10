define( ["jquery", "jquery.ui.widget", "bootstrap"], function( $ ) {
	$.widget( "ws.fixedAlert", {
		_init: function() {
			this.open();
		},
		open: function() {
			this._opened = true;
			this.element
				.addClass( "in" )
					.parents( ".alert-container" )
					.removeClass( "hidden" );
		},
		close: function() {
			function closed( event ) {
				$( event.currentTarget )
					.parents( ".alert-container" )
					.addClass( "hidden" );
				this._opened = false;
			}
			this.element
				.removeClass( "in" )
				.one( "bsTransitionEnd", closed.bind( this ) )
				.emulateTransitionEnd( 150 );
		}
	});
});