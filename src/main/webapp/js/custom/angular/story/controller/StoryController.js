define(function() {
	"use strict";
	
	function StoryController( $scope, StoryStructure ) {
		$scope.init = function( storyId ) {
			StoryStructure
				.init( storyId )
				.then(function() {
					$scope.loader.loaded = true;
				});
		};
		$scope.$on( "story:restructured", function( event, updateModel ) {
			updateModel( $scope );
		});
	}
	
	return [ "$scope", "StoryStructure", StoryController ];
});
