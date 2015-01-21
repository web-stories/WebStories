define(function() {
	"use strict";
	
	function StoryControls( jmpress, ControlsManip, SlidesManip ) {
		this.init = function( story ) {
			story.controls = {};
		};
		this.forward = function() {
			jmpress.method( "next" );
		};
		this.backward = function() {
			jmpress.method( "prev" );
		};
		this.stop = function() {
			jmpress.method( "goTo", "#section-0-0" );
		};
		this.slideChange = function( storySlides, storyControls ) {
			var chapterSiblings = ControlsManip.findChapterSiblings( storySlides );
			storyControls.prevChapter = chapterSiblings.prevChapter;
			storyControls.nextChapter = chapterSiblings.nextChapter;
		};
	}
	
	return [ "jmpress", "ControlsManip", "SlidesManip", StoryControls ];
});
