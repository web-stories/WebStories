define(function() {
	"use strict";
	function MenuController( $scope, EditorService ) {
		var storyId = $scope.storyId;
		$scope.addChapter = function() {
			EditorService.addChapter( storyId );
		};
		$scope.publish = function( chapterId ) {
			EditorService.publish( storyId, chapterId )
				.catch(
					function reject( reason ) {
						alert( reason.data.message );
					}
				);
		};
	}
	return [ "$scope", "EditorService", MenuController ];
});
