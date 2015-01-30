define( [ "angular" ], function( angular ) {
	"use strict";
	
	function StoryStructure( $rootScope, SlidesManip, StoryResource ) {
		var storyId;
		
		this.init = function( id, isPreview ) {
			storyId = id;
			return StoryResource[ isPreview ? "storyPreview" : "story" ].get({
				storyId: storyId
			})
			.$promise
			.then(function( loadedStory ) {
				$rootScope.$broadcast( "slides:restructured", function( storyModel, slidesGap ) {
					angular.extend( storyModel, loadedStory );
					SlidesManip.init( storyModel.slides, slidesGap );
				});
			});
		};
	}
	
	return [ "$rootScope", "SlidesManip", "StoryResource", StoryStructure ];
});
