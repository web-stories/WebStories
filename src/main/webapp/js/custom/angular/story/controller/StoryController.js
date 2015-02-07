define(function() {
	"use strict";
	
	function StoryController( $scope, jmpress, StoryPersistence, StoryStructure ) {
		$scope.story = {};
		$scope.init = function( storyId, isPreview ) {
			StoryStructure
				.init( storyId, isPreview )
				.then(function() {
					jmpress.register( "selectInitialStep", function( slides ) {
						return StoryPersistence.retrieveRememberedSlide( storyId, slides );
					});
					$scope.loader.loaded = true;
				});
		};
		$scope.$on( "slides:change", function() {
			StoryPersistence.rememberSlide( $scope.story.storyId, $scope.story.slides );
		});
	}
	
	return [ "$scope", "jmpress", "StoryPersistence", "StoryStructure", StoryController ];
});
