define( [ "webstories" ], function( webstories ) {
	"use strict";
	
	function StoryResource( $resource ) {
		var path = webstories.contextPath + "/api";
		this.slides = $resource( path + "/story/:storyId/slides", {
			storyId: "@storyId"
		});
		this.slidesPreview = $resource( path + "/story/:storyId/slides-preview", {
			storyId: "@storyId"
		});
	}
	
	return [ "$resource", StoryResource ];
});
