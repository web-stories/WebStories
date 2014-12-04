define(function() {
	"use strict";
	function EditorController( $scope, EditorStructure, EditorModel ) {
		$scope.data = {};
		$scope.data.scrollable = {};
		
		$scope.init = function( storyId ) {
			EditorStructure.init( storyId );
		};
		
		$scope.$on( "editor:restructured", function( event, updateModel ) {
			updateModel( $scope.data );
		});
		
		$scope.$on( "editor:chapter-add", function( event, chapter ) {
			$scope.data.scrollable.chapterId = chapter.id;
		});
		
		$scope.$on( "editor:section-add", function( event, section ) {
			$scope.data.scrollable.sectionId = section.id;
		});
		
		$scope.$on( "editor:chapter-remove", function( event, chapterId ) {
			var editor = new EditorModel( $scope.data );
			var prevChapter = editor.findPrevChapter( chapterId );
			if ( prevChapter ) {
				$scope.data.scrollable.chapterId = prevChapter.id;
			}
		});
		
		$scope.$on( "editor:section-remove", function( event, sectionId ) {
			var editor = new EditorModel( $scope.data );
			var prevSection = editor.findPrevSection( sectionId );
			$scope.data.scrollable.sectionId = prevSection.id;
		});
		
		$scope.clearScrollable = function() {
			$scope.data.scrollable = {};
		};
	}
	return [ "$scope", "EditorStructure", "EditorModel", EditorController ];
});
