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
				prevSectionId: prevSectionId
			})
			.$promise.then(function( section ) {
				$rootScope.$broadcast( "editor:restructured", function( model ) {
					refresh( storyId )
					.then(function( serverEditor ) {
						var editor = new EditorModel( model.editor );
						editor.refreshDataStructure( serverEditor );
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
						var editor = new EditorModel( model.editor );
						
						if ( result.chapter ) {
							editor.removeChapter( result.chapter.id );
						}
						
						if ( result.section ) {
							editor.removeSection( result.section.id );
						}
						
						editor.refreshDataStructure( serverEditor );
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
						var editor = new EditorModel( model.editor );
						editor.refreshDataStructure( serverEditor );
					});
				});
			});
		};
		
		function refresh( storyId ) {
			return EditorResource.editor.get({
				storyId: storyId
			})
			.$promise;
		}
	}
	return [ "$rootScope", "EditorResource", "EditorModel", EditorStructure ];
});
