define(function() {
	"use strict";
	
	function StoryStructure( $rootScope, StoryResource ) {
		var storyId;
		
		this.init = function( id ) {
			storyId = id;
			return StoryResource.slides.query({
				storyId: storyId
			})
			.$promise
			.then(function( slides ) {
				$rootScope.$broadcast( "story:restructured", function( $scope ) {
					$scope.story = {
						slides: slides
					};
				});
			});
		};
	}
	
	return [ "$rootScope", "StoryResource", StoryStructure ];
});
