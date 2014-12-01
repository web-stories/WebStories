define(function( webstories ) {
	"use strict";
	function ThumbsController( $scope, StoriesResource, ThumbsService ) {
		$scope.init = function( storyId ) {
			var chapters = StoriesResource.chapters.query({
				storyId: storyId
			});
			$scope.thumbs = ThumbsService;
			$scope.thumbs.chapters = chapters;
		};
	}
	return [ "$scope", "StoriesResource", "ThumbsService", ThumbsController ];
});
