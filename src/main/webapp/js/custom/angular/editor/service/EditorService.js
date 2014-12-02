define(function() {
	"use strict";
	function EditorService( $rootScope, StoriesResource ) {
		var service = {
			chapters: [],
			addChapter: function( storyId ) {
				StoriesResource.chapters.save({
					storyId: storyId
				})
				.$promise
					.then(
						function resolve() {
							refresh( storyId );
						}
					);
			},
			publish: function( storyId, chapterId ) {
				return StoriesResource.publications.publish({
					storyId: storyId,
					chapterId: chapterId
				})
				.$promise
					.then(
						function resolve() {
							refresh( storyId );
						}
					);
			},
			loadChapters: function( storyId ) {
				return refresh( storyId );
			}
		};
		function refresh( storyId ) {
			return StoriesResource.chapters.query({
				storyId: storyId
			})
			.$promise
				.then(function( chapters ) {
					service.chapters = chapters;
					$rootScope.$broadcast( "chapters.update" );
				});
		}
		return service;
	}
	return [ "$rootScope", "StoriesResource", EditorService ];
});
