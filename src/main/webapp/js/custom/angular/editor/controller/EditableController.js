define(function() {
	"use strict";
	function EditableController( $scope, service ) {
		$scope.addSection = service.addSection;
		$scope.removeSection = service.removeSection;
	}
	return [ "$scope", "EditorService", EditableController ];
});
