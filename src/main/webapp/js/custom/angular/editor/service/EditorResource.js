define( [ "webstories"], function( webstories ) {
	"use strict";
	function EditorResource( $resource ) {
		var path = webstories.contextPath + "/api/editor/";
		
		this.editor = $resource( path + ":storyId", {
			storyId: "@storyId"
		});
		
		this.chapters = $resource( path + ":storyId/chapters", {
			storyId: "@storyId"
		}, {
			create: {
				method: "POST"
			}
		});
		
		this.sections = $resource( path + ":storyId/chapters/:chapterId/sections/:sectionId", {
			storyId: "@storyId",
			chapterId: "@chapterId",
			sectionId: "@sectionId"
		}, {
			create: {
				method: "POST"
			}
		});
		
		this.publications = $resource( path + ":storyId/publications/:chapterId", {
			storyId: "@storyId",
			chapterId: "@chapterId"
		}, {
			publish: {
				method: "PUT"
			}
		});
	}
	return [ "$resource", EditorResource ];
});
