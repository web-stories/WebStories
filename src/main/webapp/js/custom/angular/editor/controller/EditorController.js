define(function() {
	"use strict";
	function EditorController( $scope, EditorStructure, EditorAlert ) {
		$scope.scrollable = {};
		$scope.focusable = {};
		$scope.loader = {};
		
		$scope.init = function( storyId ) {
			EditorStructure.init( storyId )
			.then(function() {
				$scope.loader.ready = true;
			})
			.catch(function( response ) {
				$scope.alert.error = EditorAlert.ajaxError( response );
			});
		};
		
		$scope.$on( "editor:restructured", function( event, updateModel ) {
			updateModel( $scope );
		});
		
		$scope.$on( "editor:chapter-add", function( event, chapter ) {
			$scope.scrollable.chapterId = chapter.id;
		});
		
		$scope.$on( "editor:section-add", function( event, section ) {
			$scope.focusable.sectionId = section.id;
		});
		
		$scope.$on( "editor:save-error", function( event, response ) {
			$scope.alert.error = EditorAlert.ajaxError( response );
		});
	}
	return [ "$scope", "EditorStructure", "EditorAlert",  EditorController ];
});
