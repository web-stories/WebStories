define(function() {
	"use strict";
	function EditorController( $scope, service ) {
		$scope.init = function( storyId ) {
			$scope.$on( "editor:refresh", function() {
				$scope.chapters = service.getChapters();
			});
			service.init( storyId );
		};
	}
	return [ "$scope", "EditorService", EditorController ];
});
