define(function() {
	"use strict";
	function EditableController( $scope, service ) {
		$scope.addSection = function( prevSectionId, chapterId ) {
			service.addSection( prevSectionId, chapterId );
		};
		$scope.removeSection = function( sectionId ) {
			service.removeSection( sectionId );
		};
	}
	return [ "$scope", "EditorService", EditableController ];
});
