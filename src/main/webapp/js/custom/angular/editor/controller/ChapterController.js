define(function() {
	"use strict";
	function ChapterController( $scope, EditorContent ) {
		$scope.$watch( "chapter.title", function( newTitle, oldTitle ) {
			if ( newTitle === oldTitle ) {
				return;
			}
			var editor = $scope.editor;
			var chapter = $scope.chapter;
			EditorContent.saveChapter( editor, chapter );
		});
	}
	return [ "$scope", "EditorContent", ChapterController ];
});
