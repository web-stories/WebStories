define( [ "webstories" ], function( webstories ) {
	"use strict";
	function SectionController( $scope, $timeout, EditorContent, EditorSectionValidation ) {
		// ========================================================================================
		// Section preview
		// ========================================================================================
		
		$scope.previewModal = {};
		$scope.loadPreview = function() {
			var context = webstories.contextPath;
			var path = "/view/stories/preview";
			var query = "id=" + $scope.editor.id;
			var hash = "section-" + $scope.chapter.position + "-" + $scope.section.position;
			$scope.previewURL = context + path + "?" + query + "#" + hash;
		};
		// Should not leave all iframes loaded, otherwise noticeable performance issues occur
		$scope.unloadPreview = function() {
			$scope.previewURL = "about:blank";
		};
		$scope.previewSection = function() {
			$scope.previewModal.show = true;
		};
		$scope.$watch( "section.text", function( newText, oldText ) {
			if ( newText !== oldText ) {
				// Disable preview for each key typed and enables after everything is saved
				$scope.previewable = false;
			}
		});
		
		// If editing and clicking for previewing too fast, the changes don't have
		// time to persist. So ensure the changes are persisted first before releasing the
		// preview button
		$scope.$on( "editor:saved", function() {
			$scope.previewable = true;
		});
		
		// ========================================================================================
		// Validation
		// ========================================================================================
		
		$scope.validity = {};
		$scope.$watch( "section.text", function( newText, oldText ) {
			$scope.validity.text = EditorSectionValidation.getValidityText( newText );
			$scope.validity.className = EditorSectionValidation.getValidityClassName( newText );
		});
		$scope.preventTyping = function( event, sectionText ) {
			if ( EditorSectionValidation.preventTyping( event, sectionText ) ) {
				event.preventDefault();
			}
		};
		
		// ========================================================================================
		// Persistence
		// ========================================================================================
		
		var debounce;
		$scope.$watch( "section.text", function( newText, oldText ) {
			// Prevent execution in the first time the page is loaded
			if ( newText !== oldText ) {
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
			function delayedAction() {
				EditorContent.saveSection( $scope.editor, $scope.chapter, $scope.section );
			}
		});
	}
	return [ "$scope", "$timeout", "EditorContent", "EditorSectionValidation",  SectionController ];
});
