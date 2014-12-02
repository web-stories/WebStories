define(function() {
	"use strict";
	function EditableController( $scope, service ) {
		$scope.addSection = function( prevSectionId, chapterId ) {
			service.addSection( prevSectionId, chapterId );
		};
	}
	return [ "$scope", "EditorService", EditableController ];
});
