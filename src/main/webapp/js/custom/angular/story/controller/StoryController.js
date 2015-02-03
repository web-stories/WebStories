define(function() {
	"use strict";
	
	function StoryController( $scope, SlidesManip, StoryPersistence, StoryStructure ) {
		$scope.story = {};
		$scope.init = function( storyId, isPreview ) {
			StoryStructure
				.init( storyId, isPreview )
				.then(function() {
					$scope.loader.loaded = true;
				});
		};
		$scope.$on( "slides:change", function() {
			var prevActiveSlide = SlidesManip.findPreviousFromActive( $scope.story.slides );
			StoryPersistence.rememberSlide( $scope.story.storyId, prevActiveSlide );
		});
	}
	
	return [ "$scope", "SlidesManip", "StoryPersistence", "StoryStructure", StoryController ];
});
