define(function( webstories ) {
	"use strict";
	function ThumbsController( $scope, StoriesResource, ChaptersService ) {
		$scope.init = function( storyId ) {
			$scope.addChapter = function() {
				StoriesResource.chapters.save({
					storyId: storyId
				})
				.$promise
					.then(function() {
						$scope.refresh( storyId );
					});
			};
			$scope.refresh = function( storyId ) {
				$scope.chapters = StoriesResource.chapters.query({
					storyId: storyId
				});
			};
			$scope.refresh( storyId );
		};
	}
	return [ "$scope", "StoriesResource", "ChaptersService", ThumbsController ];
});
