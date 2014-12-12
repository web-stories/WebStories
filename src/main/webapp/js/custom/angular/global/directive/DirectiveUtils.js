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
		 * Process the parameters of a shimmed jquery component through an angular directive which
		 * uses jstl tags as templates.<br>
		 * Even though some of the parameters declared in a custom jstl tag may not be passed
		 * to the jQuery component, they are still declared empty, which can cause problems with
		 * default component values.<br>
		 * For the reason above, if the parameter is an empty string, assumes the parameter should
		 * not be returned, otherwise return converting its string value to the respective JS
		 * primitive type equivalent.
		 */
		attrParams: function( obj ) {
			var context = this;
			var result = {};
			Object.keys( obj ).forEach(function( key ) {
				var value = obj[ key ];
				
				if ( value === "" ) {
					return;
				}
				
				result[ key ] = context.toType( value );
			});
			return result;
		}
	};
});
