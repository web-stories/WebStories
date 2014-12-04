define(function() {
	"use strict";
	function ChapterController( $scope ) {
		$scope.$watch( "chapter.title", function() {
			console.log( "title saved!" );
		});
	}
	return [ "$scope", ChapterController ];
});
