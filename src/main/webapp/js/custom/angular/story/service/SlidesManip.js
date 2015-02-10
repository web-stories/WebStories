define(function() {
	"use strict";
	
	function SlidesManip( jmpress ) {
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
		/*
		 * Find all slides that belong to a given chapter.
		 * 
		 * -1: last chapter
		 * 0: intro
		 * 1: chapter 1
		 */
		this.findChapterSlides = function( slides, chapter ) {
			var i, currentSlide, lastChapter;
			var found = [];
			
			if ( chapter === -1 ) {
				for ( i = slides.length - 1; i > 0; i -= 1 ) {
					currentSlide = slides[ i ];
					if ( !lastChapter || lastChapter === currentSlide.chapter ) {
						found.push( currentSlide );
						lastChapter = currentSlide.chapter;
					} else {
						break;
					}
				}
			} else {
				for ( i = 0; i < slides.length; i += 1 ) {
					currentSlide = slides[ i ];
					if ( currentSlide.chapter === chapter ) {
						found.push( currentSlide );
					}
				}
			}
			
			return found;
		};
	}
	
	return [ "jmpress", SlidesManip ];
});
