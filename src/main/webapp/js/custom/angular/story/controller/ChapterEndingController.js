define(function() {
	"use strict";
	function ChapterEndingController( $rootScope, $scope, SlidesBehavior ) {
		$scope.modal = {};
		$rootScope.$on( "slides:change", function( event, story ) {
			SlidesBehavior.chapterEnding( story, $scope.modal );
		});
	}
	return [ "$rootScope", "$scope", "SlidesBehavior", ChapterEndingController ];
});
