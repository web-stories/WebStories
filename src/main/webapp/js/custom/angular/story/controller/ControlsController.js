define(function() {
	"use strict";
	
	function ControlsController( $scope, StoryControls ) {
		$scope.forward = StoryControls.forward;
		$scope.backward = StoryControls.backward;
	}
	
	return [ "$scope", "StoryControls", ControlsController ];
});
