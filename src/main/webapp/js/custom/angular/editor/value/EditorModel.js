/**
 * Facade to manipulate and query on the editor model
 */
define(function() {
	"use strict";
	function EditorModel( editor ) {
		
		this.addChapter = function( chapter ) {
			editor.chapters.push( chapter );
		};
		
		this.removeChapter = function( chapterId ) {
			editor.chapters.forEach(function( chapter, index ) {
				if ( chapter.id === chapterId ) {
					editor.chapters.splice( index, 1 );
				}
			});
		};
		
		this.removeSection = function( sectionId ) {
			editor.chapters.forEach(function( chapter, chapterIndex ) {
				chapter.sections.forEach(function( section, sectionIndex ) {
					if ( section.id === sectionId ) {
						editor
							.chapters[ chapterIndex ]
							.sections.splice( sectionIndex, 1 );
					}
				});
			});
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
