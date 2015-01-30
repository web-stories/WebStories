define(function() {
	"use strict";
	function ChapterEndingController( $rootScope, $scope, SlidesBehavior ) {
		$scope.modal = {};
		$rootScope.$on( "slides:change", function( event ) {
			SlidesBehavior.chapterEnding( $scope.story, $scope.modal );
		});
	}
	return [ "$rootScope", "$scope", "SlidesBehavior", ChapterEndingController ];
});
