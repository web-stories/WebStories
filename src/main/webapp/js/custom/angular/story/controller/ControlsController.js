define(function() {
	"use strict";
	
	function ControlsController( $scope, StoryControls ) {
		$scope.story.controls = {};
		$scope.$watch( "story.slides", function( slides, oldSlides ) {
			// Ignore first call with empty slides
			if ( slides === oldSlides ) {
				return;
			}
			StoryControls.slideChange( $scope.story.slides, $scope.story.controls );
		}, true /* Detect changes in the 'active' property inside each object in the array */ );
		$scope.prevChapter = StoryControls.prevChapter;
		$scope.nextChapter = StoryControls.nextChapter;
		$scope.nextSlide = StoryControls.nextSlide;
		$scope.prevSlide = StoryControls.prevSlide;
		$scope.stop = StoryControls.stop;
	}
	
	return [ "$scope", "StoryControls", ControlsController ];
});
