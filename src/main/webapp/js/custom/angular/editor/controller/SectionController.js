define( [ "webstories" ], function( webstories ) {
	"use strict";
	function SectionController( $scope, $timeout, EditorContent, EditorSectionValidation ) {
		$scope.validity = {};
		$scope.modal = {};
		
		$scope.loadPreview = function() {
			var context = webstories.contextPath;
			var path = "/view/stories/preview";
			var query = "id=" + $scope.editor.id;
			var hash = "section-" + $scope.chapter.position + "-" + $scope.section.position;
			$scope.previewURL = context + path + "?" + query + "#" + hash;
		};
		
		$scope.unloadPreview = function() {
			$scope.previewURL = "about:blank";
		};
		
		// Validation
		$scope.$watch( "section.text", function( newText, oldText ) {
			$scope.validity.text = EditorSectionValidation.getValidityText( newText );
			$scope.validity.className = EditorSectionValidation.getValidityClassName( newText );
		});
		
		// Server update
		var debounce;
		$scope.$watch( "section.text", function( newText, oldText ) {
			// Prevent execution in the first time the page is loaded
			if ( newText !== oldText ) {
				// If all content is deleted, update the server immediately, it prevents error when
				// deleting the content and removing the section before debounce callback is
				// executed
				if ( !newText ) {
					saveText();
				} else {
					if ( debounce ) {
						$timeout.cancel( debounce );
					}
					debounce = $timeout( saveText, 1000 );
				}
			}
		});
		
		$scope.preventTyping = function( event ) {
			var text = $scope.section.text;
			if ( EditorSectionValidation.preventTyping( event, text ) ) {
				event.preventDefault();
			}
		};
		
		$scope.previewSection = function( sectionId, chapterId ) {
			$scope.modal.show = true;
		};
		
		function saveText() {
			var editor = $scope.editor;
			var chapter = $scope.chapter;
			var section = $scope.section;
			EditorContent.saveSection( $scope.editor, $scope.chapter, $scope.section );
		}
	}
	return [ "$scope", "$timeout", "EditorContent", "EditorSectionValidation",  SectionController ];
});
