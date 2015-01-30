/**
 * Handle rules related to the behavior of slides
 */
define(function() {
	"use strict";
	function SlidesBehavior( $rootScope, jmpress, SlidesManip ) {
		this.slideChange = function( slides ) {
			var active = jmpress.getActiveReference( slides );
			if ( !active ) {
				return;
			}
			var activeSlide = active.step;
			var chapterSlides = SlidesManip.findChapterSlides( slides, activeSlide.chapter );
			$rootScope.$broadcast( "slides:change", {
				activeSlide: activeSlide,
				chapterSlides: chapterSlides
			});
		};
	}
	return [ "$rootScope", "jmpress", "SlidesManip", SlidesBehavior ];
});
