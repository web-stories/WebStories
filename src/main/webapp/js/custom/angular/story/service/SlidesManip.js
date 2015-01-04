define(function() {
	"use strict";
	
	function SlidesManip() {
		this.init = function( slides, slidesGap ) {
			var currentX = 0;
			slides.forEach(function( slide ) {
				slide.id = [ "section", slide.chapter, slide.section ].join( "-" );
				slide.data = {
					y: 0,
					x: currentX += slidesGap
				};
			});
		};
	}
	
	return [ SlidesManip ];
});
