define(function() {
	"use strict";
	function StoryPersistence( $cookieStore, SlidesManip ) {
		this.rememberSlide = function( storyId, slides ) {
			var rememberedSlide = SlidesManip.findPreviousFromActive( $scope.story.slides );
			var stories = $cookieStore.get( "stories" ) || {};
			stories[ storyId ] = rememberedSlide;
			$cookieStore.put( "stories", stories );
		};
		this.retrieveRemembered = function( storyId ) {
			return $cookieStore.get( "stories" )[ storyId ];
		};
	}
	return [ "$cookieStore", "SlidesManip", StoryPersistence ];
});
