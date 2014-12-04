define(function() {
	"use strict";
	function EditorStructure( $rootScope, EditorResource, EditorModel ) {
		var storyId;
		
		this.init = function( id ) {
			storyId = id;
			refresh( storyId )
			.then(function( editor ) {
				$rootScope.$broadcast( "editor:restructured", function( model ) {
					model.editor = editor;
				});
			});
		};
		
		this.addChapter = function() {
			EditorResource.chapters.create({
				storyId: storyId
			})
			.$promise.then(function( chapter ) {
				$rootScope.$broadcast( "editor:restructured", function( model ) {
					var editor = new EditorModel( model.editor );
					editor.addChapter( chapter );
				});
				$rootScope.$broadcast( "editor:chapter-add", chapter );
			});
		};
		
		this.addSection = function( prevSectionId, chapterId ) {
			EditorResource.sections.create({
				storyId: storyId,
				chapterId: chapterId,
				sectionId: prevSectionId
			})
			.$promise.then(function( section ) {
				$rootScope.$broadcast( "editor:restructured", function( model ) {
					refresh( storyId )
					.then(function( serverEditor ) {
						// TODO should not erase other sections text
						model.editor.chapters = serverEditor.chapters;
					});
				});
				$rootScope.$broadcast( "editor:section-add", section );
			});
		};
		
		this.removeSection = function( sectionId, chapterId ) {
			EditorResource.sections.remove({
				storyId: storyId,
				chapterId: chapterId,
				sectionId: sectionId
			})
			.$promise.then(function( result ) {
				// Chapter removal is broadcasted over section removal
				result.chapter ?
					$rootScope.$broadcast( "editor:chapter-remove", result.chapter.id ) :
					$rootScope.$broadcast( "editor:section-remove", result.section.id );
				refresh( storyId )
				.then(function( serverEditor ) {
					$rootScope.$broadcast( "editor:restructured", function( model ) {
						var modelEditor = model.editor;
						
						if ( result.chapter ) {
							modelEditor.chapters.forEach(function( chapter, index ) {
								if ( chapter.id === result.chapter.id ) {
									modelEditor.chapters.splice( index, 1 );
								}
							});
						}
						
						if ( result.section ) {
							modelEditor.chapters.forEach(function( chapter, chapterIndex ) {
								chapter.sections.forEach(function( section, sectionIndex ) {
									if ( section.id === result.section.id ) {
										modelEditor
											.chapters[ chapterIndex ]
											.sections.splice( sectionIndex, 1 );
									}
								});
							});
						}
						
						// TODO should not erase other sections text
						modelEditor.chapters = serverEditor.chapters;
					});
				});
			});
		};
		
		this.publish = function( chapterId ) {
			return EditorResource.publications.publish({
				storyId: storyId,
				chapterId: chapterId
			})
			.$promise.then(function() {
				refresh( storyId )
				.then(function( serverEditor ) {
					$rootScope.$broadcast( "editor:restructured", function( model ) {
						// TODO should not erase other sections text
						model.editor.chapters = serverEditor.chapters;
					});
				});
			});
		};
		
		function eachSection( editor, fn ) {
			editor.chapters.forEach(function( chapter ) {
				chapter.sections.forEach( fn );
			});
		}
		
		function refresh( storyId ) {
			return EditorResource.editor.get({
				storyId: storyId
			})
			.$promise;
		}
	}
	return [ "$rootScope", "EditorResource", "EditorModel", EditorStructure ];
});
