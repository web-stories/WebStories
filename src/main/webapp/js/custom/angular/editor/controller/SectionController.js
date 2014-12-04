define(function() {
	"use strict";
	function SectionController( $scope, content ) {
		$scope.$watch( "section.text", function( modifiedText ) {
			content.saveSection( modifiedText, $scope.section );
		});
	}
	return [ "$scope", "EditorContent", SectionController ];
});
