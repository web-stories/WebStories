define(function() {
	"use strict";
	function EditorController( $scope, EditorStructure, EditorModel ) {
		$scope.scrollable = {};
		$scope.focusable = {};
		$scope.loader = {};
		
		$scope.init = function( storyId ) {
			EditorStructure.init( storyId )
				.then(function() {
					$scope.loader.ready = true;
				});
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
		
		$scope.clearScrollable = function() {
			$scope.scrollable = {};
		};
		
		$scope.clearFocusable = function() {
			$scope.focusable = {};
		};
	}
	return [ "$scope", "EditorStructure", "EditorModel", EditorController ];
});
