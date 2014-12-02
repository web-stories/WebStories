define(function() {
	"use strict";
	function EditorService( $rootScope, EditorResource ) {
		var storyId, editor;
		
		this.init = function( id ) {
			storyId = id;
			refresh( storyId );
		};
		
		this.getChapters = function() {
			return editor.chapters;
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
			return EditorResource.editor.get({
				storyId: storyId
			})
			.$promise
				.then(function( obj ) {
					editor = obj;
					$rootScope.$broadcast( "editor:refresh" );
				});
		}
	}
	return [ "$rootScope", "EditorResource", EditorService ];
});
