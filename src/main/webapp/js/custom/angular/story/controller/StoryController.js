define(function() {
	"use strict";
	
	function StoryController( $scope, $document, StoryStructure ) {
		$scope.init = function( storyId ) {
			StoryStructure
				.init( storyId )
				.then(function() {
					$scope.loader.loaded = true;
				});
		};
		$scope.$on( "story:restructured", function( event, updateModel ) {
			updateModel( $scope, $document[ 0 ].documentElement.clientWidth );
		});
	}
	
	return [ "$scope", "$document", "StoryStructure", StoryController ];
});
