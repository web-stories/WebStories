define(function() {
	"use strict";
	
	function StoryStructure( $rootScope, SlidesManip, StoryResource ) {
		var storyId;
		
		this.init = function( id ) {
			storyId = id;
			return StoryResource.slides.query({
				storyId: storyId
			})
			.$promise
			.then(function( slides ) {
				$rootScope.$broadcast( "story:restructured", function( $scope, slidesGap ) {
					SlidesManip.init( slides, slidesGap );
					$scope.story = {
						slides: slides
					};
				});
			});
		};
	}
	
	return [ "$rootScope", "SlidesManip", "StoryResource", StoryStructure ];
});
