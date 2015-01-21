define(function() {
	"use strict";
	
	function ControlsManip( SlidesManip ) {
		this.findChapterSiblings = function( slides ) {
			var activeSlide = SlidesManip.findActive( slides );
			var lastChapterSlides = SlidesManip.findChapterSlides( slides, -1 );
			
			if ( !activeSlide || activeSlide.chapter === 0 ) {
				return {
					prevChapter: undefined,
					nextChapter: undefined
				};
			}
			
			var prev = activeSlide.chapter - 1;
			var next = activeSlide.chapter + 1;
			
			if ( activeSlide.chapter === 1 ) {
				prev = undefined;
			}
			if ( activeSlide.chapter === lastChapterSlides[ 0 ].chapter ) {
				next = undefined;
			}
			
			return {
				prevChapter: prev,
				nextChapter: next
			};
		};
	}
	return [ "SlidesManip", ControlsManip ];
});
