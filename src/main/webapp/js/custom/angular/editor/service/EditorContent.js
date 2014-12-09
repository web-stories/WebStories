define(function() {
	"use strict";
	function EditorContent( $rootScope, EditorResource, EditorSavingQueue ) {
		this.saveSection = function( editor, chapter, section ) {
			var operation = function( next ) {
				EditorResource.sections.persist({
					sectionId: section.id,
					chapterId: chapter.id,
					storyId: editor.id,
					section: section
				})
				.$promise
				.catch(function( response ) {
					$rootScope.$broadcast( "editor:save-error", response );
				})
				.finally( next );
			};
			EditorSavingQueue.queue( operation );
		};
		this.saveChapter = function( editor, chapter ) {
			var operation = function( next ) {
				EditorResource.chapters.persist({
					chapterId: chapter.id,
					storyId: editor.id,
					chapter: chapter
				})
				.$promise
				.catch(function( response ) {
					$rootScope.$broadcast( "editor:save-error", response );
				})
				.finally( next );
			};
			EditorSavingQueue.queue( operation );
		};
	}
	return [ "$rootScope", "EditorResource", "EditorSavingQueue", EditorContent ];
});
