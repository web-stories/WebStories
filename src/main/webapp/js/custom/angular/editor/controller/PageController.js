define(function() {
	"use strict";
	
	function PageController( $scope ) {
		$scope.alert = {};
		$scope.modal = {};
	}
	
	return [ "$scope", PageController ];
});
