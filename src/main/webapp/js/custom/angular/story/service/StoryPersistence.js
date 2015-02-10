define(function() {
	"use strict";
	function StoryPersistence( $cookieStore, SlidesManip ) {
		this.rememberSlide = function( storyId, slides ) {
			var rememberedSlide = SlidesManip.findPreviousFromActive( slides );
			var stories = $cookieStore.get( "stories" ) || {};
			stories[ storyId ] = rememberedSlide;
			$cookieStore.put( "stories", stories );
		};
		this.retrieveRememberedSlide = function( storyId, slides ) {
			var stories = $cookieStore.get( "stories" );
			if ( !stories ) {
				// There's no story being remembered
				return;
			}
			
			var stored = stories[ storyId ];
			if ( !stored ) {
				// This story doesn't have a remembered slide
				return;
			}
			
			return slides.filter(function( slide ) {
				return slide.chapter === stored.chapter && slide.section === stored.section;
			})[ 0 ];
		};
	}
	return [ "$cookieStore", "SlidesManip", StoryPersistence ];
});
