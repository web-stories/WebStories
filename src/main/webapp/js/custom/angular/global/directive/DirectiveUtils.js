define( [ "jquery" ], function( $ ) {
	"use strict";
	return {
		/**
		 * Parse a given string to te respective type. Respect the same rule as jQuery.fn.data() 
		 */
		toType: function( string ) {
			var id = "verification_" + Math.random();
			return $( "<div>" )
				.attr( "data-" + id, string )
				.data( id );
		},
		/**
		 * Process the parameters of a shimmed jquery component through an angular directive.
		 */
		param: function( obj ) {
			var context = this;
			var result = {};
			Object.keys( obj ).forEach(function( key ) {
				var value = obj[ key ];
				result[ key ] = context.toType( value );
			});
			return result;
		}
	};
});
