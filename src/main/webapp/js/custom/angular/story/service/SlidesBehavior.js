/**
 * Handle special behavior for steps, other than just print the contents in the view
 */
define(function() {
	"use strict";
	function SlidesBehavior( $rootScope, jmpress ) {
		this.handleChapterEnding = function( slides ) {
			var activeSlide = jmpress.getActiveReference( slides ).step;
			var openModal = activeSlide.type === "CHAPTER_ENDING";
			$rootScope.$broadcast( "modal-open:chapter-ending", openModal );
		};
	}
	return [ "$rootScope", "jmpress", SlidesBehavior ];
});
