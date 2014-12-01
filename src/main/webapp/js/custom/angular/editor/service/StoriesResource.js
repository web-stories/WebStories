define( [ "webstories"], function( webstories ) {
	"use strict";
	function StoriesResource( $resource ) {
		var contextPath = webstories.contextPath;
		return {
			stories: $resource( contextPath + "/api/stories/:storyId", {
				storyId: "@storyId"
			}, {
				save: {
					method: "PUT",
					url: "save"
				}
			}),
			chapters: $resource( contextPath + "/api/stories/:storyId/chapters/:chapterId", {
				storyId: "@storyId",
				chapterId: "@chapterId"
			}, {
				validate: {
					method: "POST",
					url: "validate"
				}
			})
		};
	}
	return [ "$resource", StoriesResource ];
});
