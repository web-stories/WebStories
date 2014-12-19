define(function() {
	"use strict";
	
	function PresentationController( $scope ) {
		$scope.impressInit = function( api ) {
			$scope.impress = api;
		};
	}
	
	return [ "$scope", PresentationController ];
});
