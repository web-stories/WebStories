define(function() {
	"use strict";
	return {
		is: function( constant ) {
			return matchMedia( this[ constant ] ).matches;
		},
		SM: "(min-width: 768px)"
	};
});
