define(function() {
	"use strict";
	function MenuController( $scope, service ) {
		$scope.addChapter = function() {
			service.addChapter();
		};
		$scope.publish = function( chapterId ) {
			service.publish( chapterId )
				.catch(
					function reject( reason ) {
						alert( reason.data.message );
					}
				);
		};
	}
	return [ "$scope", "EditorService", MenuController ];
});
