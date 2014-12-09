define(function() {
	"use strict";
	
	function EditorAlert() {
		this.ajaxError = function( response ) {
			return {
				message: "Ocorreu um problema ao tentar salvar a história.",
				response: response
			};
		};
	}
	
	return [ EditorAlert ];
});
