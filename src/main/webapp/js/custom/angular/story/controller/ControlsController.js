define(function() {
	"use strict";
	
	function ControlsController( $scope, StoryControls ) {
		$scope.story.controls = {};
		$scope.$watch( "story.slides", function( slides, oldSlides ) {
			StoryControls.applySiblings( $scope.story.slides, $scope.story.controls );
		}, true );
		$scope.prevChapter = StoryControls.prevChapter;
		$scope.nextChapter = StoryControls.nextChapter;
		$scope.nextSlide = StoryControls.nextSlide;
		$scope.prevSlide = StoryControls.prevSlide;
		$scope.stop = StoryControls.stop;
	}
	
	return [ "$scope", "StoryControls", ControlsController ];
});
