define(function() {
	"use strict";
	function EditableController( $scope, ChaptersService ) {
		$scope.init = function( storyId ) {
			$scope.$on( "chapters.update", function() {
				$scope.chapters = ChaptersService.chapters;
			});
			ChaptersService.loadChapters( storyId );
		};
	}
	return [ "$scope", "ChaptersService", EditableController ];
});
