define(function() {
	"use strict";
	function EditorController( $scope, service ) {
		$scope.data = {};
		$scope.data.scrollable = {};
		
		$scope.init = function( storyId ) {
			service.init( storyId );
		};
		
		$scope.$on( "editor:refresh", function( event, editor ) {
			$scope.data.editor = editor;
		});
		
		$scope.$on( "editor:chapter-add", function( event, chapter ) {
			$scope.data.scrollable.chapterId = chapter.id;
		});
		
		$scope.clearScrollable = function() {
			$scope.data.scrollable = {};
		};
	}
	return [ "$scope", "EditorService", EditorController ];
});
