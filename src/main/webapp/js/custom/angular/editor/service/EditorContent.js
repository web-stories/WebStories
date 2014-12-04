define(function() {
	"use strict";
	function EditorContent( EditorResource, EditorSavingQueue ) {
		this.saveSection = function( text, section ) {
			var callback = function( next ) {
				EditorResource.sections.persist({
					sectionId: section.id,
					text: text
				}).$promise.then( next );
			};
			EditorSavingQueue.queue( callback );
		};
	}
	return [ "EditorResource", "EditorSavingQueue", EditorContent ];
});
