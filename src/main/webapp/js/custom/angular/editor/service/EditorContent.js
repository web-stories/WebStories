define(function() {
	"use strict";
	function EditorContent( EditorResource, EditorSavingQueue ) {
		this.saveSection = function( editor, chapter, section ) {
			var operation = function( next ) {
				EditorResource.sections.persist({
					sectionId: section.id,
					chapterId: chapter.id,
					storyId: editor.id,
					section: section
				}).$promise.finally( next );
			};
			EditorSavingQueue.queue( operation );
		};
		this.saveChapter = function( editor, chapter ) {
			var operation = function( next ) {
				EditorResource.chapters.persist({
					chapterId: chapter.id,
					storyId: editor.id,
					chapter: chapter
				}).$promise.finally( next );
			};
			EditorSavingQueue.queue( operation );
		};
	}
	return [ "EditorResource", "EditorSavingQueue", EditorContent ];
});
