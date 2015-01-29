/**
 * Handle all modals used in the story viewer
 */
define(function() {
	"use strict";
	function ModalsController( $rootScope, $scope ) {
		$scope.modals = {
			chapterEnding: {}
		};
		$rootScope.$on( "modal-open:chapter-ending", function( event, state ) {
			$scope.modals.chapterEnding.open = state;
		});
	}
	return [ "$rootScope", "$scope", ModalsController ];
});
