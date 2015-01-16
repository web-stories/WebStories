define(function() {
	"use strict";
	
	function StoryControls( jmpress ) {
		this.forward = function() {
			jmpress.method( "next" );
		};
		this.backward = function() {
			jmpress.method( "prev" );
		};
		this.stop = function() {
			jmpress.method( "goTo", "#section-0-0" );
		};
	}
	
	return [ "jmpress", StoryControls ];
});
