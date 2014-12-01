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
			$scope.publish = function( chapterId ) {
				StoriesResource.publications.publish({
					storyId: storyId,
					chapterId: chapterId
				})
				.$promise
					.then(
						function resolve() {
							$scope.refresh( storyId );
						},
						function reject( reason ) {
							alert( reason.data.message );
						}
					);
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
