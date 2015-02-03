define(function() {
	"use strict";
	function StoryPersistence( $cookieStore ) {
		this.rememberSlide = function( storyId, rememberedSlide ) {
			var stories = $cookieStore.get( "stories" ) || {};
			stories[ storyId ] = rememberedSlide;
			$cookieStore.put( "stories", stories );
		};
		this.retrieveRemembered = function( storyId ) {
			return $cookieStore.get( "stories" )[ storyId ];
		};
	}
	return [ "$cookieStore", StoryPersistence ];
});
