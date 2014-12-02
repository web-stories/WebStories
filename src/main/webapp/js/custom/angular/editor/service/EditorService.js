define(function() {
	"use strict";
	function EditorService( $rootScope, EditorResource ) {
		var service = {
			chapters: [],
			addChapter: function( storyId ) {
				EditorResource.chapters.save({
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
				return EditorResource.publications.publish({
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
			return EditorResource.chapters.query({
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
	return [ "$rootScope", "EditorResource", EditorService ];
});
