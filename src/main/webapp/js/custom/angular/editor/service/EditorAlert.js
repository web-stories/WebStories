define(function() {
	"use strict";
	
	function EditorAlert() {
		this.ajaxError = function( response ) {
			return {
				message: "<b>Erro:</b> Não consegui salvar",
				response: response
			};
		};
	}
	
	return [ EditorAlert ];
});
