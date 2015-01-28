define(function() {
	"use strict";
	
	function PageController( $scope ) {
		$scope.alert = {};
		$scope.loader = {};
	}
	
	return [ "$scope", PageController ];
});
