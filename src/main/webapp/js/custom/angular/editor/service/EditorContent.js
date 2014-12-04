define(function() {
	"use strict";
	function EditorContent( EditorResource, EditorSavingQueue ) {
		this.saveSection = function( text, editor, chapter, section ) {
			var callback = function( next ) {
				EditorResource.sections.persist({
					sectionId: section.id,
					chapterId: chapter.id,
					storyId: editor.id,
					section: section
				}).$promise.then( next );
			};
			EditorSavingQueue.queue( callback );
		};
	}
	return [ "EditorResource", "EditorSavingQueue", EditorContent ];
});
