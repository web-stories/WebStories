define( [ "webstories" ], function( webstories ) {
	"use strict";
	
	function EditorResource( $resource ) {
		var path = webstories.contextPath + "/api/story/";
		this.slides = $resource( path + ":storyId/slides", {
			storyId: "@storyId"
		});
	}
	
	return [ "$resource", EditorResource ];
});
