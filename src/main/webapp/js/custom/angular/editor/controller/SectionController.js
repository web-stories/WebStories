define(function() {
	"use strict";
	function SectionController( $scope, EditorContent ) {
		$scope.$watch( "section.text", function() {
			var editor = $scope.editor;
			var chapter = $scope.chapter;
			var section = $scope.section;
			EditorContent.saveSection( editor, chapter, section );
		});
	}
	return [ "$scope", "EditorContent", SectionController ];
});
