define(function() {
	"use strict";
	function EditorStructure( $rootScope, EditorResource, EditorModel, EditorSavingQueue ) {
		var storyId;
		
		this.init = function( id ) {
			storyId = id;
			refresh( storyId )
			.then(function( editor ) {
				$rootScope.$broadcast( "editor:restructured", function( $scope ) {
					$scope.editor = editor;
				});
			});
		};
		
		this.addChapter = function() {
			EditorResource.chapters.create({
				storyId: storyId
			})
			.$promise.then(function( chapter ) {
				$rootScope.$broadcast( "editor:restructured", function( $scope ) {
					var editor = EditorModel.create( $scope.editor );
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
				$rootScope.$broadcast( "editor:restructured", function( $scope ) {
					refresh( storyId )
					.then(function( serverEditor ) {
						var editor = EditorModel.create( $scope.editor );
						editor.refreshDataStructure( serverEditor );
					});
				});
				$rootScope.$broadcast( "editor:section-add", section );
			});
		};
		
		this.removeSection = function( chapterId, sectionId ) {
			var operation = function( next ) {
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
						$rootScope.$broadcast( "editor:restructured", function( $scope ) {
							var editor = EditorModel.create( $scope.editor );
							
							if ( result.chapter ) {
								editor.removeChapter( result.chapter.id );
							}
							
							if ( result.section ) {
								editor.removeSection( result.section.id );
							}
							
							editor.refreshDataStructure( serverEditor );
							
							next();
						});
					});
				});
			};
			EditorSavingQueue.queue( operation );
		};
		
		this.publish = function( chapterId ) {
			return EditorResource.publications.publish({
				storyId: storyId,
				chapterId: chapterId
			})
			.$promise.then(function() {
				refresh( storyId )
				.then(function( serverEditor ) {
					$rootScope.$broadcast( "editor:restructured", function( $scope ) {
						var editor = EditorModel.create( $scope.editor );
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
	return [ "$rootScope", "EditorResource", "EditorModel", "EditorSavingQueue", EditorStructure ];
});
