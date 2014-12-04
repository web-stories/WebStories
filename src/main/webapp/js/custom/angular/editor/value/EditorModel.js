/**
 * Facade to manipulate and query on the editor model
 */
define(function() {
	"use strict";
	function EditorModel( editor ) {
		
		this.addChapter = function( chapter ) {
			editor.chapters.push( chapter );
		};
		
		this.findPrevChapter = function( id ) {
			var prev;
			editor.chapters.some(function( current ) {
				if ( current.id === id ) {
					return true;
				}
				prev = current;
			});
			return prev;
		};
		
		this.findPrevSection = function( id ) {
			var prev;
			var allSections = [];
			
			editor.chapters.forEach(function( chapter ) {
				allSections = allSections.concat( chapter.sections );
			});
			
			allSections.some(function( current ) {
				if ( current.id === id ) {
					return true;
				}
				prev = current;
			});
			
			return prev;
		};
	}
	return EditorModel;
});
