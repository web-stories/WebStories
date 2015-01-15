define(function() {
	"use strict";
	
	function SlidesManip() {
		this.init = function( slides, slidesGap ) {
			var lastSlideChapter;
			var currentX = 0;
			slides.forEach(function( slide ) {
				slide.id = [ "section", slide.chapter, slide.section ].join( "-" );
				slide.data = {
					y: 0,
					x: currentX += slidesGap
				};
				if ( lastSlideChapter !== slide.chapter ) {
					slide.data.transitionDuration = 600;
					lastSlideChapter = slide.chapter;
				}
			});
		};
	}
	
	return [ SlidesManip ];
});
