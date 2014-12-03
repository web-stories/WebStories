define(function() {
	"use strict";
	function EditorController( $scope, service ) {
		$scope.data = {};
		$scope.init = function( storyId ) {
			$scope.$on( "editor:refresh", function( event, editor ) {
				$scope.data.editor = editor;
			});
			service.init( storyId );
		};
	}
	return [ "$scope", "EditorService", EditorController ];
});
