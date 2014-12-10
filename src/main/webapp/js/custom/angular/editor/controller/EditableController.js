define(function() {
	"use strict";
	function EditableController( $scope, EditorStructure ) {
		$scope.addSection = EditorStructure.addSection;
		$scope.removeSection = EditorStructure.removeSection;
	}
	return [ "$scope", "EditorStructure", EditableController ];
});
