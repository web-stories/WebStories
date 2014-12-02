define(function() {
	"use strict";
	function EditorController( $scope, EditorService ) {
		$scope.init = function( storyId ) {
			$scope.storyId = storyId;
			$scope.$on( "chapters.update", function() {
				$scope.chapters = EditorService.chapters;
			});
			EditorService.loadChapters( storyId );
		};
	}
	return [ "$scope", "EditorService", EditorController ];
});
