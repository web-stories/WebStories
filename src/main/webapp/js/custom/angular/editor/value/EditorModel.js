/**
 * Facade to manipulate and query on the editor model
 */
define( [ "lodash" ], function( _ ) {
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
		
		this.refreshDataStructure = function( serverEditor ) {
			_.zip( editor.chapters, serverEditor.chapters ).forEach(function( chapters ) {
				var i, modelSection, serverSection;
				var modelChapter = chapters[ 0 ];
				var serverChapter = chapters[ 1 ];
				var sectionsZip = _.zip( modelChapter.sections, serverChapter.sections );
				
				beginning:
				for ( i = 0; i < sectionsZip.length; i += 1 ) {
					modelSection = sectionsZip[ i ][ 0 ];
					serverSection = sectionsZip[ i ][ 1 ];
					if ( modelSection.id === serverSection.id ) {
						modelSection.position = serverSection.position;
					} else {
						modelChapter.sections.splice( i, 0, serverSection );
						sectionsZip = _.zip( modelChapter.sections, serverChapter.sections );
						continue beginning;
					}
				}
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
