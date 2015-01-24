define(function() {
	"use strict";
	
	function SlidesStructure( $rootScope, SlidesManip, StoryResource ) {
		var storyId;
		
		this.init = function( id, isPreview ) {
			storyId = id;
			return StoryResource[ isPreview ? "slidesPreview" : "slides" ].query({
				storyId: storyId
			})
			.$promise
			.then(function( slides ) {
				$rootScope.$broadcast( "slides:restructured", function( story, slidesGap ) {
					SlidesManip.init( slides, slidesGap );
					[].push.apply( story.slides, slides );
				});
			});
		};
	}
	
	return [ "$rootScope", "SlidesManip", "StoryResource", SlidesStructure ];
});
