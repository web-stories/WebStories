package org.webstories.core.story.viewer;

public abstract class StorySlide {
	private int chapter;
	private int section;
	private SlideType type;
	
	public StorySlide( SlideFactory factory ) {
		this.chapter = factory.createChapter();
		this.section = factory.createSection();
		this.type = factory.createType();
	}
	
	public int getChapter() {
		return chapter;
	}
	
	public int getSection() {
		return section;
	}
	
	public SlideType getType() {
		return type;
	}
}
