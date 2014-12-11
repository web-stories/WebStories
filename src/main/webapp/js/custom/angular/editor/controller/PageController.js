define(function() {
	"use strict";
	
	function PageController( $scope ) {
		$scope.alert = {};
	}
	
	return [ "$scope", PageController ];
});
