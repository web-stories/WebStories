/**
 * Handle all modals used in the story viewer
 */
define(function() {
	"use strict";
	function ChapterEndingController( $rootScope, $scope ) {
		$scope.modal = {
			open: false
		};
		$rootScope.$on( "slides:change", function( event, slide ) {
			var openModal = slide.type === "CHAPTER_ENDING";
			$scope.modal.open = openModal;
		});
	}
	return [ "$rootScope", "$scope", ChapterEndingController ];
});
