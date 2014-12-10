define( [ "angular", "webstories"], function( angular, webstories ) {
	"use strict";
	function EditorResource( $resource ) {
		var path = webstories.contextPath + "/api/editor/";
		
		this.editor = $resource( path + ":storyId", {
			storyId: "@storyId"
		});
		
		this.chapters = $resource( path + ":storyId/chapters/:chapterId", {
			storyId: "@storyId",
			chapterId: "@chapterId"
		}, {
			persist: {
				method: "PUT",
				transformRequest: function( data ) {
					return angular.toJson( data.chapter );
				}
			},
			create: {
				method: "POST"
			}
		});
		
		this.sections = $resource( path + ":storyId/chapters/:chapterId/sections/:sectionId", {
			storyId: "@storyId",
			chapterId: "@chapterId",
			sectionId: "@sectionId"
		}, {
			persist: {
				method: "PUT",
				transformRequest: function( data ) {
					return angular.toJson( data.section );
				}
			},
			create: {
				method: "POST",
				params: {
					prevSectionId: "@prevSectionId"
				}
			}
		});
		
		this.publications = $resource( path + ":storyId/publications/:chapterId", {
			storyId: "@storyId",
			chapterId: "@chapterId"
		}, {
			validate: {
				method: "POST",
				url: path + ":storyId/publications/:chapterId/validate",
				isArray: true
			},
			publish: {
				method: "PUT"
			}
		});
	}
	return [ "$resource", EditorResource ];
});
