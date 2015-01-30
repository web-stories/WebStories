define( [ "webstories" ], function( webstories ) {
	"use strict";
	
	function StoryResource( $resource ) {
		var path = webstories.contextPath + "/api";
		this.story = $resource( path + "/story/:storyId", {
			storyId: "@storyId"
		});
		this.storyPreview = $resource( path + "/story/:storyId/preview", {
			storyId: "@storyId"
		});
	}
	
	return [ "$resource", StoryResource ];
});
