define(function() {
	"use strict";
	
	function StoryController( $scope, StoryPersistence, StoryStructure ) {
		$scope.story = {};
		$scope.init = function( storyId, isPreview ) {
			StoryStructure
				.init( storyId, isPreview )
				.then(function() {
					$scope.loader.loaded = true;
				});
		};
		$scope.$on( "slides:change", function() {
			StoryPersistence.rememberSlide( $scope.story.storyId, $scope.story.slides );
		});
	}
	
	return [ "$scope", "StoryPersistence", "StoryStructure", StoryController ];
});
