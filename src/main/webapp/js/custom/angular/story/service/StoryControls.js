define(function() {
	"use strict";
	
	function StoryControls( jmpress ) {
		this.forward = function() {
			jmpress.method( "next" );
		};
		this.backward = function() {
			jmpress.method( "prev" );
		};
	}
	
	return [ "jmpress", StoryControls ];
});
