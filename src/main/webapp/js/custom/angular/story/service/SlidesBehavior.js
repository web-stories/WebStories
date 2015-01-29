/**
 * Handle rules related to the behavior of slides
 */
define(function() {
	"use strict";
	function SlidesBehavior( $rootScope, jmpress ) {
		this.slideChange = function( slides ) {
			var active = jmpress.getActiveReference( slides );
			if ( !active ) {
				return;
			}
			var activeSlide = active.step;
			$rootScope.$broadcast( "slides:change", activeSlide );
		};
	}
	return [ "$rootScope", "jmpress", SlidesBehavior ];
});
