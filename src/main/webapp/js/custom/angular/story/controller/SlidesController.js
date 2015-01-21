define(function() {
	"use strict";
	function SlidesController( $scope, $document, SlidesStructure ) {
		$scope.story.slides = [];
		$scope.init = function( storyId ) {
			SlidesStructure
				.init( storyId )
				.then(function() {
					$scope.loader.loaded = true;
				});
		};
		$scope.$on( "slides:restructured", function( event, updateModel ) {
			var slidesGap = $document[ 0 ].documentElement.clientWidth;
			updateModel( $scope.story, slidesGap );
		});
	}
	return [ "$scope", "$document", "SlidesStructure", SlidesController ];
});
