define(function() {
	"use strict";
	
	function StoryControls( jmpress, ControlsManip ) {
		this.init = function( story ) {
			story.controls = {};
		};
		this.nextSlide = function() {
			jmpress.method( "next" );
		};
		this.prevSlide = function() {
			jmpress.method( "prev" );
		};
		this.stop = function() {
			jmpress.method( "goTo", "#section-0-0" );
		};
		this.prevChapter = function( chapterNumber ) {
			jmpress.method( "goTo", "#section-" + chapterNumber + "-0" );
		};
		this.nextChapter = function( chapterNumber ) {
			jmpress.method( "goTo", "#section-" + chapterNumber + "-0" );
		};
		this.applySiblings = function( storySlides, storyControls ) {
			var chapterSiblings = ControlsManip.findChapterSiblings( storySlides );
			storyControls.prevChapter = chapterSiblings.prevChapter;
			storyControls.nextChapter = chapterSiblings.nextChapter;
		};
	}
	
	return [ "jmpress", "ControlsManip", StoryControls ];
});
