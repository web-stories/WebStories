define( [ "webstories"], function( webstories ) {
	"use strict";
	function EditorResource( $resource ) {
		var storiesURL = webstories.contextPath + "/api/stories/:storyId";
		return {
			stories: $resource( storiesURL, {
				storyId: "@storyId"
			}),
			chapters: $resource( storiesURL + "/chapters/:chapterId", {
				storyId: "@storyId",
				chapterId: "@chapterId"
			}),
			publications: $resource( storiesURL + "/publications/:chapterId", {
				storyId: "@storyId",
				chapterId: "@chapterId"
			}, {
				publish: {
					method: "PUT"
				}
			})
		};
	}
	return [ "$resource", EditorResource ];
});
