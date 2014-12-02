define(function( webstories ) {
	"use strict";
	function ThumbsController( $scope, ChaptersService ) {
		$scope.init = function( storyId ) {
			$scope.$on( "chapters.update", function() {
				$scope.chapters = ChaptersService.chapters;
			});
			$scope.addChapter = function() {
				ChaptersService.addChapter( storyId );
			};
			$scope.publish = function( chapterId ) {
				ChaptersService.publish( storyId, chapterId )
					.catch(
						function reject( reason ) {
							alert( reason.data.message );
						}
					);
			};
			ChaptersService.loadChapters( storyId );
		};
	}
	return [ "$scope", "ChaptersService", ThumbsController ];
});
