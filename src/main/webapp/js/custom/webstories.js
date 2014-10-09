define( ["jquery"], function( $ ) {
	"use strict";
	return {
		contextPath: "",
		loadComponent: function( url, data, success ) {
			if ( $.isFunction( data ) ) {
				success = data;
				data = undefined;
			}
			$.ajax({
				dataType: "html",
				data: data,
				success: function() {
					var args = [].slice.call( arguments );
					var container = $( "<div>" ).append( args[ 0 ] );
					args[ 0 ] = container.find( "#wrapper-default" ).html();
					success.apply( this, args );
				},
				url: url
			});
		},
		api: function( url, type, data ) {
			return $.ajax({
				url: this.contextPath + url,
				type: type,
				contentType: "application/json",
				data: JSON.stringify( data )
			});
		}
	};
});