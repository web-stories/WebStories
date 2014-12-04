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
			refreshPositionable( editor.chapters, serverEditor.chapters )
				.forEach(function( chapters ) {
					var modelChapter = chapters[ 0 ];
					var serverChapter = chapters[ 1 ];
					refreshPositionable( modelChapter.sections, serverChapter.sections );
				});
		};
		
		function refreshPositionable( modelArray, serverArray ) {
			var modelItem, serverItem;
			var i = 0;
			var zip = _.zip( modelArray, serverArray );
			beginning:
			for ( ; i < zip.length; i += 1 ) {
				modelItem = zip[ i ][ 0 ];
				serverItem = zip[ i ][ 1 ];
				if ( modelItem.id === serverItem.id ) {
					modelItem.position = serverItem.position;
				} else {
					modelArray.splice( i, 0, serverItem );
					zip = _.zip( modelArray, serverArray );
					continue beginning;
				}
			}
			return zip;
		}
		
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
