define(function() {
	"use strict";
	function EditorContent( EditorResource, EditorSavingQueue ) {
		this.saveSection = function( editor, chapter, section ) {
			var callback = function( next ) {
				EditorResource.sections.persist({
					sectionId: section.id,
					chapterId: chapter.id,
					storyId: editor.id,
					section: section
				}).$promise.finally( next );
			};
			EditorSavingQueue.queue( callback );
		};
		this.saveChapter = function( editor, chapter ) {
			var callback = function( next ) {
				EditorResource.chapters.persist({
					chapterId: chapter.id,
					storyId: editor.id,
					chapter: chapter
				}).$promise.finally( next );
			};
			EditorSavingQueue.queue( callback );
		};
	}
	return [ "EditorResource", "EditorSavingQueue", EditorContent ];
});
