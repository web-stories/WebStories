/**
 * Handle rules related to the behavior of slides
 */
define(function() {
	"use strict";
	function SlidesBehavior( $rootScope, jmpress ) {
		this.chapterEnding = function( story, modal ) {
			var slides = story.slides;
			var activeReference = jmpress.getActiveReference( story.slides );
			
			if ( !activeReference ) {
				return;
			}
			
			modal.open = activeReference.step.type === "CHAPTER_ENDING";
			modal.title = slides[ 0 ].title;
		};
	}
	return [ "$rootScope", "jmpress", SlidesBehavior ];
});
