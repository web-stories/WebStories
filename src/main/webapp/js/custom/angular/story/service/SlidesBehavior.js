/**
 * Handle rules related to the behavior of slides
 */
define(function() {
	"use strict";
	function SlidesBehavior( $rootScope, jmpress, SlidesManip ) {
		this.chapterEnding = function( story, modal ) {
			var activeReference = jmpress.getActiveReference( story.slides );
			
			if ( !activeReference ) {
				return;
			}
			
			var activeSlide = activeReference.step;
			var chapterSlides = SlidesManip.findChapterSlides( story.slides, activeSlide.chapter );
			
			modal.open = activeSlide.type === "CHAPTER_ENDING";
			modal.title = chapterSlides[ 0 ].title;
		};
	}
	return [ "$rootScope", "jmpress", "SlidesManip", SlidesBehavior ];
});
