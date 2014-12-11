define(function() {
	"use strict";
	function SectionController( $scope, $timeout, EditorContent, EditorSectionValidation ) {
		var debounce;
		$scope.validity = {};
		
		// Validation
		$scope.$watch( "section.text", function( newText, oldText ) {
			$scope.validity.text = EditorSectionValidation.getValidityText( newText );
			$scope.validity.className = EditorSectionValidation.getValidityClassName( newText );
		});
		
		// Server update
		$scope.$watch( "section.text", function( newText, oldText ) {
			// Prevent execution in the first time the page is loaded
			if ( newText !== oldText ) {
				// Disable preview for each new type and enables after everything is saved
				$scope.previewable = false;
				
				// If all content is deleted, update to the server immediately, it prevents
				// error when deleting the content and removing the section before debounce
				// callback is executed
				if ( !newText ) {
					delayedAction();
				} else {
					if ( debounce ) {
						$timeout.cancel( debounce );
					}
					debounce = $timeout( delayedAction, 1000 );
				}
			}
		});
		
		// If editing and clicking for previewing too fast, the changes don't have
		// time to persist. So ensure the changes are persisted first before releasing the
		// preview button
		$scope.$on( "editor:saved", function() {
			$scope.previewable = true;
		});
		
		$scope.preventTyping = function( event ) {
			var text = $scope.section.text;
			if ( EditorSectionValidation.preventTyping( event, text ) ) {
				event.preventDefault();
			}
		};
		
		$scope.previewSection = function( chapterPosition, sectionPosition ) {
			$scope.previewModal.show = true;
			$scope.loadPreview( $scope.editor.id, chapterPosition, sectionPosition );
		};
		
		function delayedAction() {
			EditorContent.saveSection( $scope.editor, $scope.chapter, $scope.section );
		}
	}
	return [ "$scope", "$timeout", "EditorContent", "EditorSectionValidation",  SectionController ];
});
