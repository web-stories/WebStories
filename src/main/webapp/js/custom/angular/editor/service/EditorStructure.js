define(function() {
	"use strict";
	function EditorStructure( $rootScope, EditorResource, EditorModel, EditorSavingQueue ) {
		var storyId;
		
		this.init = function( id ) {
			storyId = id;
			return refresh( storyId )
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
			.$promise
			.then(function( chapter ) {
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
			.$promise
			.then(function( section ) {
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
				var removalResult;
				EditorResource.sections.remove({
					storyId: storyId,
					chapterId: chapterId,
					sectionId: sectionId
				})
				.$promise
				.then(function( result ) {
					removalResult = result;
					return refresh( storyId );
				})
				.then(function( serverEditor ) {
					$rootScope.$broadcast( "editor:restructured", function( $scope ) {
						var editor = EditorModel.create( $scope.editor );
						
						if ( removalResult.chapter ) {
							editor.removeChapter( removalResult.chapter.id );
						}
						
						if ( removalResult.section ) {
							editor.removeSection( removalResult.section.id );
						}
						
						editor.refreshDataStructure( serverEditor );
					});
				})
				.finally( next );
			};
			EditorSavingQueue.queue( operation );
		};
		
		this.validate = function( chapterId ) {
			return EditorResource.publications.validate({
				storyId: storyId,
				chapterId: chapterId
			})
			.$promise;
		};
		
		this.publish = function( chapterId ) {
			return EditorResource.publications.publish({
				storyId: storyId,
				chapterId: chapterId
			})
			.$promise
			.then(function() {
				return refresh( storyId );
			})
			.then(function( serverEditor ) {
				$rootScope.$broadcast( "editor:restructured", function( $scope ) {
					var editor = EditorModel.create( $scope.editor );
					editor.refreshDataStructure( serverEditor );
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
