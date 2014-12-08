define(function() {
	"use strict";
	function EditorController( $scope, EditorStructure, EditorModel ) {
		$scope.scrollable = {};
		$scope.focusable = {};
		
		$scope.init = function( storyId ) {
			EditorStructure.init( storyId );
		};
		
		$scope.$on( "editor:restructured", function( event, updateModel ) {
			updateModel( $scope );
		});
		
		$scope.$on( "editor:chapter-add", function( event, chapter ) {
			$scope.scrollable.chapterId = chapter.id;
		});
		
		$scope.$on( "editor:section-add", function( event, section ) {
			$scope.scrollable.sectionId = section.id;
			$scope.focusable.sectionId = section.id;
		});
		
		$scope.$on( "editor:chapter-remove", function( event, chapterId ) {
			var editor = EditorModel.create( $scope.editor );
			var prevChapter = editor.findPrevChapter( chapterId );
			if ( prevChapter ) {
				$scope.scrollable.chapterId = prevChapter.id;
			}
		});
		
		$scope.$on( "editor:section-remove", function( event, sectionId ) {
			var editor = EditorModel.create( $scope.editor );
			var prevSection = editor.findPrevSection( sectionId );
			$scope.scrollable.sectionId = prevSection.id;
		});
		
		$scope.clearScrollable = function() {
			$scope.scrollable = {};
		};
		
		$scope.clearFocusable = function() {
			$scope.focusable = {};
		};
	}
	return [ "$scope", "EditorStructure", "EditorModel", EditorController ];
});
