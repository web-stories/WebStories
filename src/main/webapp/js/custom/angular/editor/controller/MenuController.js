define(function() {
	"use strict";
	function MenuController( $scope, ChaptersService ) {
		var storyId = $scope.storyId;
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
	}
	return [ "$scope", "ChaptersService", MenuController ];
});
