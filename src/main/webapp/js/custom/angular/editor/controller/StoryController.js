define(function() {
	"use strict";
	function StoryController( $scope, ChaptersService ) {
		$scope.init = function( storyId ) {
			$scope.storyId = storyId;
			$scope.$on( "chapters.update", function() {
				$scope.chapters = ChaptersService.chapters;
			});
			ChaptersService.loadChapters( storyId );
		};
	}
	return [ "$scope", "ChaptersService", StoryController ];
});
