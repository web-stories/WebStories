define(function() {
	"use strict";
	function SectionController( $scope ) {
		$scope.$watch( "section.title", function() {
			console.log( "section saved!" );
		});
	}
	return [ "$scope", SectionController ];
});
