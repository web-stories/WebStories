define(function() {
	"use strict";
	function EditableController( $scope, service ) {
		$scope.addSection = function( prevSectionId, chapterId ) {
			service.addSection( prevSectionId, chapterId );
		};
		$scope.removeSection = function( sectionId, chapterId ) {
			service.removeSection( sectionId, chapterId );
		};
	}
	return [ "$scope", "EditorService", EditableController ];
});
