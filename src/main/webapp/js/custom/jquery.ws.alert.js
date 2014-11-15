define( ["jquery", "webstories", "jquery.ui.widget", "bootstrap"], function( $, webstories ) {
	"use strict";
	$.widget( "ws.actionAlert", {
		options: {
			load: function( loaded ) {
				webstories.loadComponent( "/components/alert-action", loaded );
			}
		},
		_open: function( resolve ) {
			clearTimeout( this._closingTimeout );
			this._opened = true;
			
			if ( !this._alert ) {
				this.options.load(function( html ) {
					this._render( html );
					this._showElement();
					resolve();
				}.bind( this ));
			} else {
				this._showElement();
				resolve();
			}
		},
		_render: function( html ) {
			this._alert = $( html )
				.prependTo( this.element )
				.find( ".alert" );
		},
		_showElement: function() {
			this._alert
				.addClass( "in" )
				.parents( ".alert-container" )
				.removeClass( "hidden" );
		},
		_close: function() {
			function closed( event ) {
				this._alert
					.parents( ".alert-container" )
					.addClass( "hidden" );
				this._opened = false;
			}
			this._alert
				.removeClass( "in" )
				.one( "bsTransitionEnd", closed.bind( this ) )
				.emulateTransitionEnd( 150 );
		},
		_ajaxErrorMessages: {
			401: "Você não está logado.",
			403: "Acesso negado.",
			404: "O sistema não encontrou o caminho especificado.",
			500: "Ocorreu um erro interno no servidor."
		},
		closeAfter: function( millis ) {
			this._closingTimeout = this._delay( this._close, millis );
		},
		show: function( text ) {
			return new Promise( this._open.bind( this ) )
				.then(function() {
					this.element
						.find( ".alert-saving-text" )
						.html( text );
				}.bind( this ));
		},
		ajaxError: function( message, jqXHR ) {
			var error = this._ajaxErrorMessages[ jqXHR.status ];
			var content = [ "<b>Erro:</b> Não consegui salvar", message ].join( "<br>" );
			this.show( content );
		}
	});
});
