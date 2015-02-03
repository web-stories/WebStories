define(function() {
	"use strict";
	function StoryPersistence( $cookieStore, SlidesManip ) {
		this.rememberSlide = function( storyId, slides ) {
			var rememberedSlide = SlidesManip.findPreviousFromActive( slides );
			var stories = $cookieStore.get( "stories" ) || {};
			stories[ storyId ] = rememberedSlide;
			$cookieStore.put( "stories", stories );
		};
		this.activateRemembered = function( storyId, slides ) {
			var stored = $cookieStore.get( "stories" )[ storyId ];
			SlidesManip.activate( slides, stored.chapter, stored.section );
		};
	}
	return [ "$cookieStore", "SlidesManip", StoryPersistence ];
});
