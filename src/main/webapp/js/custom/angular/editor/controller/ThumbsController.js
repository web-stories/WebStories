define(function( webstories ) {
	"use strict";
	function ThumbsController( $scope, StoriesResource, ChaptersService ) {
		$scope.init = function( storyId ) {
			var chapters = StoriesResource.chapters.query({
				storyId: storyId
			});
			$scope.thumbs = ChaptersService;
			$scope.thumbs.chapters = chapters;
		};
	}
	return [ "$scope", "StoriesResource", "ChaptersService", ThumbsController ];
});
