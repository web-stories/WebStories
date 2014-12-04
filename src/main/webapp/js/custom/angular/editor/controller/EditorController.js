define(function() {
	"use strict";
	function EditorController( $scope, EditorStructure, EditorModel ) {
		$scope.model = {};
		$scope.model.scrollable = {};
		
		$scope.init = function( storyId ) {
			EditorStructure.init( storyId );
		};
		
		$scope.$on( "editor:restructured", function( event, updateModel ) {
			updateModel( $scope.model );
		});
		
		$scope.$on( "editor:chapter-add", function( event, chapter ) {
			$scope.model.scrollable.chapterId = chapter.id;
		});
		
		$scope.$on( "editor:section-add", function( event, section ) {
			$scope.model.scrollable.sectionId = section.id;
		});
		
		$scope.$on( "editor:chapter-remove", function( event, chapterId ) {
			var editor = new EditorModel( $scope.model );
			var prevChapter = editor.findPrevChapter( chapterId );
			if ( prevChapter ) {
				$scope.model.scrollable.chapterId = prevChapter.id;
			}
		});
		
		$scope.$on( "editor:section-remove", function( event, sectionId ) {
			var editor = new EditorModel( $scope.model );
			var prevSection = editor.findPrevSection( sectionId );
			$scope.model.scrollable.sectionId = prevSection.id;
		});
		
		$scope.clearScrollable = function() {
			$scope.model.scrollable = {};
		};
	}
	return [ "$scope", "EditorStructure", "EditorModel", EditorController ];
});
