define(function() {
	"use strict";
	function EditorService( $rootScope, EditorResource ) {
		var storyId;
		var chapters = [];
		
		this.init = function( id ) {
			storyId = id;
			refresh( storyId );
		};
		
		this.getChapters = function() {
			return chapters;
		};
		
		this.addChapter = function() {
			EditorResource.chapters.save({
				storyId: storyId
			})
			.$promise
				.then(
					function resolve() {
						refresh( storyId );
					}
				);
		};
		
		this.publish = function( chapterId ) {
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
		};
		
		function refresh( storyId, broadcast ) {
			return EditorResource.chapters.query({
				storyId: storyId
			})
			.$promise
				.then(function( arr ) {
					chapters = arr;
					$rootScope.$broadcast( "editor:refresh" );
				});
		}
	}
	return [ "$rootScope", "EditorResource", EditorService ];
});
