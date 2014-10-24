define( ["jquery", "jquery.ui.widget", "jquery.ws.alert"], function( $ ) {
	"use strict";
	$.widget( "ws.saving", $.ws.fixedAlert, {
		_saving: function() {
			clearTimeout( this._closingTimeout );
			this.element
				.find( ".alert-saving-text" )
				.text( "Salvando..." );
		},
		open: function() {
			this._saving();
			this._super();
		},
		saved: function() {
			this.element
				.find( ".alert-saving-text" )
				.html( "A história foi salva com sucesso!" );
			this._closingTimeout = this._delay( this.close, 3000 );
		},
		error: function( jqXHR ) {
			var createMessage = function( status ) {
				var msg = ({
					401: "Você não está logado.",
					403: "Acesso negado.",
					404: "O sistema não encontrou o caminho especificado.",
					500: "Ocorreu um erro interno no servidor."
				})[ status ];
				if ( !msg ) {
					msg = "Falha de conexão com o servidor.";
				}
				return msg;
			};
			var content = [
				"<b>Erro:</b> Não foi possível salvar",
				createMessage( jqXHR.status )
			].join( "<br>" );
			this.element
				.find( ".alert-saving-text" )
				.html( content );
		}
	});
});
