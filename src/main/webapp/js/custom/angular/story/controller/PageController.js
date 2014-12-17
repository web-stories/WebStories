define(function() {
	"use strict";
	
	function PageController( $scope ) {
		$scope.alert = {};
		$scope.loader = {};
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.loader.loaded = true;
			});
		}, 1000 );
	}
	
	return [ "$scope", PageController ];
});
