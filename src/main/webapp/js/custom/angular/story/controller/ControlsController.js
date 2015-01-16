define(function() {
	"use strict";
	
	function ControlsController( $scope, StoryControls ) {
		$scope.forward = StoryControls.forward;
		$scope.backward = StoryControls.backward;
		$scope.stop = StoryControls.stop;
	}
	
	return [ "$scope", "StoryControls", ControlsController ];
});
