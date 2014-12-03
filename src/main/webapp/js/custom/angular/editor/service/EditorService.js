define(function() {
	"use strict";
	function EditorService( $rootScope, EditorResource ) {
		var storyId, editor;
		
		this.init = function( id ) {
			storyId = id;
			refresh( storyId );
		};
		
		this.addChapter = function() {
			EditorResource.chapters.save({
				storyId: storyId
			})
			.$promise
				.then(
					function resolve() {
						refresh( storyId )
							.then(function( editor ) {
								var lastChapter = editor.chapters[ editor.chapters.length - 1 ];
								$rootScope.$broadcast( "editor:chapter-add", lastChapter );
							});
					}
				);
		};
		
		this.addSection = function( prevSectionId, chapterId ) {
			EditorResource.sections.create({
				storyId: storyId,
				chapterId: chapterId,
				sectionId: prevSectionId
			})
			.$promise
				.then(
					function resolve() {
						refresh( storyId );
					}
				);
		};
		
		this.removeSection = function( sectionId, chapterId ) {
			EditorResource.sections.remove({
				storyId: storyId,
				chapterId: chapterId,
				sectionId: sectionId
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
					$rootScope.$broadcast( "editor:refresh", editor );
					return editor;
				});
		}
	}
	return [ "$rootScope", "EditorResource", EditorService ];
});
