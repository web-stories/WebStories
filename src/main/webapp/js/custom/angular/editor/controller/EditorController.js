define(function() {
	"use strict";
	function EditorController( $scope, service ) {
		$scope.data = {};
		$scope.data.scrollable = {};
		
		$scope.init = function( storyId ) {
			service.init( storyId );
		};
		
		$scope.$on( "editor:updated", function( event, editor ) {
			$scope.data.editor = editor;
		});
		
		$scope.$on( "editor:chapter-add", function( event, chapter ) {
			$scope.data.scrollable.chapterId = chapter.id;
		});
		
		$scope.$on( "editor:section-add", function( event, section ) {
			$scope.data.scrollable.sectionId = section.id;
		});
		
		$scope.$on( "editor:chapter-remove", function( event, id ) {
			var prevChapter = service.findPrevChapter( id );
			if ( prevChapter ) {
				$scope.data.scrollable.chapterId = prevChapter.id;
			}
		});
		
		$scope.$on( "editor:section-remove", function( event, id ) {
			var prevSection = service.findPrevSection( id );
			$scope.data.scrollable.sectionId = prevSection.id;
		});
		
		$scope.clearScrollable = function() {
			$scope.data.scrollable = {};
		};
	}
	return [ "$scope", "EditorService", EditorController ];
});
