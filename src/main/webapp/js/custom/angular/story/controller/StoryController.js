define(function() {
	"use strict";
	
	function StoryController( $scope, SlidesManip, StoryPersistence ) {
		$scope.story = {};
		$scope.$on( "slides:change", function() {
			var prevActiveSlide = SlidesManip.findPreviousFromActive( $scope.story.slides );
			StoryPersistence.rememberSlide( 17, prevActiveSlide );
		});
	}
	
	return [ "$scope", "SlidesManip", "StoryPersistence", StoryController ];
});
