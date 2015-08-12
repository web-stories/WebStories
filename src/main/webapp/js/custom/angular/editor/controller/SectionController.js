define([
	"webstories",
	"viewport",
	"dynamic-textarea"
], function( webstories, viewport, dynamicTextarea ) {
	"use strict";
	function SectionController( $scope, $timeout, EditorContent, EditorSectionValidation ) {
		$scope.$watch( "section.text", function() {
			// Update the textarea height in the next digest cycle
			// after the view is rendered
			$timeout(function() {
				dynamicTextarea.refresh();
			});
		});
		// ========================================================================================
		// Section preview
		// ========================================================================================
		
		$scope.previewModal = {};
		$scope.loadPreview = function() {
			$scope.previewURL = generatePreviewURL();
		};
		// Should not leave all iframes loaded, otherwise noticeable performance issues occur
		$scope.unloadPreview = function() {
			$scope.previewURL = "about:blank";
		};
		$scope.previewSection = function() {
			// Open modal for larger screens
			if ( viewport.is( "SM" ) ) {
				$scope.previewModal.show = true;
			} else {
				window.open( generatePreviewURL() );
			}
		};
		$scope.previewPopup = function() {
			window.open( generatePreviewURL() );
		};
		$scope.$watch( "section.text", function( newText, oldText ) {
			if ( newText !== oldText ) {
				// Disable preview for each key typed and enables after everything is saved
				$scope.previewable = false;
			}
		});
		function generatePreviewURL() {
			var context = webstories.contextPath;
			var path = "/view/stories/preview";
			var query = "id=" + $scope.editor.id;
			var hash = "section-" + $scope.chapter.position + "-" + $scope.section.position;
			return context + path + "?" + query + "#" + hash;
		}
		
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
