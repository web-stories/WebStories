define(function() {
	"use strict";
	function MenuController( $scope, EditorStructure ) {
		$scope.addChapter = EditorStructure.addChapter;
		$scope.publish = function( chapterId ) {
			EditorStructure.publish( chapterId )
				.catch(
					function reject( reason ) {
						alert( reason.data.message );
					}
				);
		};
	}
	return [ "$scope", "EditorStructure", MenuController ];
});
