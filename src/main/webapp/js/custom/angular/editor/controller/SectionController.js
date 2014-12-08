define(function() {
	"use strict";
	function SectionController( $scope, $timeout, EditorContent, EditorSectionValidation ) {
		var debounce;
		$scope.validity = {};
		$scope.$watch( "section.text", function( newText, oldText ) {
			var editor = $scope.editor;
			var chapter = $scope.chapter;
			var section = $scope.section;
			
			$scope.validity.text = EditorSectionValidation.getValidityText( newText );
			$scope.validity.className = EditorSectionValidation.getValidityClassName( newText );
			
			// Prevent execution the first time the page is loaded
			if ( newText !== oldText ) {
				if ( debounce ) {
					$timeout.cancel( debounce );
				}
				debounce = $timeout(function() {
					EditorContent.saveSection( editor, chapter, section );
				}, 1000 );
			}
		});
		
		$scope.preventTyping = function( event ) {
			var text = $scope.section.text;
			if ( EditorSectionValidation.preventTyping( event, text ) ) {
				event.preventDefault();
			}
		};
	}
	return [ "$scope", "$timeout", "EditorContent", "EditorSectionValidation",  SectionController ];
});
