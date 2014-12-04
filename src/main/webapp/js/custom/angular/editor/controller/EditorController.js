define(function() {
	"use strict";
	function EditorController( $scope, EditorStructure ) {
		$scope.data = {};
		$scope.data.scrollable = {};
		
		$scope.init = function( storyId ) {
			EditorStructure.init( storyId );
		};
		
		$scope.$on( "editor:restructured", function( event, editor ) {
			$scope.data.editor = editor;
		});
		
		$scope.$on( "editor:chapter-add", function( event, chapter ) {
			$scope.data.scrollable.chapterId = chapter.id;
		});
		
		$scope.$on( "editor:section-add", function( event, section ) {
			$scope.data.scrollable.sectionId = section.id;
		});
		
		$scope.$on( "editor:chapter-remove", function( event, id ) {
			var prevChapter = EditorStructure.findPrevChapter( id );
			if ( prevChapter ) {
				$scope.data.scrollable.chapterId = prevChapter.id;
			}
		});
		
		$scope.$on( "editor:section-remove", function( event, id ) {
			var prevSection = EditorStructure.findPrevSection( id );
			$scope.data.scrollable.sectionId = prevSection.id;
		});
		
		$scope.clearScrollable = function() {
			$scope.data.scrollable = {};
		};
	}
	return [ "$scope", "EditorStructure", EditorController ];
});
