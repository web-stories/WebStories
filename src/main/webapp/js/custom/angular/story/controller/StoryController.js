define(function() {
	"use strict";
	
	function StoryController( $scope ) {
		$scope.story = {};
	}
	
	return [ "$scope", StoryController ];
});
