define(function() {
	"use strict";
	function EditorService( $rootScope, EditorResource ) {
		var storyId, editor;
		
		this.init = function( id ) {
			storyId = id;
			refresh( storyId )
				.then(function( editor ) {
					$rootScope.$broadcast( "editor:updated", editor );
				});
		};
		
		this.addChapter = function() {
			EditorResource.chapters.create({
				storyId: storyId
			})
			.$promise
				.then(
					function resolve( chapter ) {
						editor.chapters.push( chapter );
						$rootScope.$broadcast( "editor:updated", editor );
						$rootScope.$broadcast( "editor:chapter-add", chapter );
					}
				);
		};
		
		this.addSection = function( prevSectionId, chapterId ) {
			EditorResource.sections.create({
				storyId: storyId,
				chapterId: chapterId,
				sectionId: prevSectionId
			})
			.$promise
				.then(
					function resolve( section ) {
						refresh( storyId )
							.then(function( editor ) {
								$rootScope.$broadcast( "editor:updated", editor );
								$rootScope.$broadcast( "editor:section-add", section );
							});
					}
				);
		};
		
		this.removeSection = function( sectionId, chapterId ) {
			EditorResource.sections.remove({
				storyId: storyId,
				chapterId: chapterId,
				sectionId: sectionId
			})
			.$promise
				.then(
					function resolve( result ) {
						if ( result.chapter ) {
							$rootScope
								.$broadcast( "editor:chapter-remove", result.chapter.id );
						} else {
							$rootScope
								.$broadcast( "editor:section-remove", result.section.id );
						}
						refresh( storyId )
							.then(function( editor ) {
								$rootScope.$broadcast( "editor:updated", editor );
							});
					}
				);
		};
		
		this.publish = function( chapterId ) {
			return EditorResource.publications.publish({
				storyId: storyId,
				chapterId: chapterId
			})
			.$promise
				.then(
					function resolve() {
						refresh( storyId )
							.then(function( editor ) {
								$rootScope.$broadcast( "editor:updated", editor );
							});
					}
				);
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
		
		function refresh( storyId ) {
			return EditorResource.editor.get({
				storyId: storyId
			})
			.$promise
				.then(function( obj ) {
					editor = obj;
					return editor;
				});
		}
	}
	return [ "$rootScope", "EditorResource", EditorService ];
});
