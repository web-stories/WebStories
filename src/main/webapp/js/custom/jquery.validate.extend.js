define( ["jquery", "jquery.validate"], function( $ ) {
	$.validator.setDefaults({
		highlight: function( element ) {
			$( element ).parents( ".form-group:first" )
				.addClass( "has-error" );
		},
		unhighlight: function( element ) {
			$( element ).parents( ".form-group:first" )
				.removeClass( "has-error" );
		},
		errorPlacement: function( error, element ) {
			$( error )
				.addClass( "control-label" )
				.insertAfter( element );
		}
	});
	$.extend( $.validator.messages, {
		required: "Campo obrigatório",
		remote: "Informação inválida",
		email: "E-mail inválido",
		url: "URL inválida.",
		date: "Data inválida",
		dateISO: "Data inválida no padrão ISO",
		number: "Número inválido",
		digits: "Forneça apenas dígitos",
		creditcard: "Cartão de crédito inválido",
		equalTo: "Forneça o mesmo valor novamente",
		accept: "Extensão inválida",
		maxlength: $.validator.format( "Limite de {0} caracteres" ),
		minlength: $.validator.format( "Limite mínimo de {0} caracteres" ),
		rangelength: $.validator.format( "Limite entre {0} e {1} caracteres" ),
		range: $.validator.format( "Forneça um valor entre {0} e {1}" ),
		max: $.validator.format( "O valor deve ser menor ou igual a {0}" ),
		min: $.validator.format( "O valor deve ser maior ou igual a {0}" )
	});
});