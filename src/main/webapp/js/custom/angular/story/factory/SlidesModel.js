define(function() {
	"use strict";
	
	function SlidesModel( slides ) {
		this.chapters = function() {
			return slides.map(function( element ) {
				if ( element.type === "CHAPTER" ) {
					return element;
				}
			});
		};
	}
	
	return function() {
		return {
			create: function( slides ) {
				return new SlidesModel( slides );
			}
		};
	};
});
