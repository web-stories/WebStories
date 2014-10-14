define( ["jquery", "jquery.ui.widget", "jquery.ws.alert"], function( $ ) {
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
			var statusMessage = {
				500: "Ocorreu um erro interno no servidor",
				404: "O servidor foi reiniciado ou você está sem conexão com a internet"
			};
			var content = [
				"<b>Erro:</b> Não foi possível salvar",
				statusMessage[ jqXHR.status ]
			].join( "<br>" );
			this.element
				.find( ".alert-saving-text" )
				.html( content );
		}
	});
});
