define(function() {
	"use strict";
	function MenuController( $scope, EditorStructure ) {
		$scope.addChapter = EditorStructure.addChapter;
		$scope.publish = function( chapterId ) {
			EditorStructure.validate( chapterId )
			.then(function( validationObjects ) {
				if ( validationObjects.length ) {
					$scope.alert.validation = validationObjects;
					return;
				}
				return EditorStructure.publish( chapterId );
			});
		};
	}
	return [ "$scope", "EditorStructure", MenuController ];
});
