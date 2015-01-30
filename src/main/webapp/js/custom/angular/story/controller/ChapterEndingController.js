define(function() {
	"use strict";
	function ChapterEndingController( $rootScope, $scope ) {
		$scope.modal = {};
		$rootScope.$on( "slides:change", function( event, data ) {
			$scope.modal.open = data.activeSlide.type === "CHAPTER_ENDING";
			$scope.modal.title = data.chapterSlides[ 0 ].title;
		});
	}
	return [ "$rootScope", "$scope", ChapterEndingController ];
});
