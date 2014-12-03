define(function() {
	"use strict";
	function EditorService( $rootScope, EditorResource ) {
		var storyId, editor;
		
		this.init = function( id ) {
			storyId = id;
			EditorResource.editor.get({
				storyId: storyId
			})
			.$promise
				.then(function( obj ) {
					editor = obj;
					$rootScope.$broadcast( "editor:refresh", editor );
				});
		};
		
		this.getEditor = function() {
			return editor;
		};
		
		this.addChapter = function() {
			EditorResource.chapters.create({
				storyId: storyId
			})
			.$promise
				.then(
					function resolve( chapter ) {
						editor.chapters.push( chapter );
						$rootScope.$broadcast( "editor:refresh", editor );
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
					function resolve() {
						refresh( storyId );
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
					function resolve() {
						refresh( storyId );
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
						refresh( storyId );
					}
				);
		};
	}
	return [ "$rootScope", "EditorResource", EditorService ];
});
