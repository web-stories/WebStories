package org.webstories.core.story.viewer;

import org.webstories.dao.story.ChapterEntity;

public class ChapterEndingSlideFactory implements SlideFactory  {
private ChapterEntity chapter;
	
	public ChapterEndingSlideFactory( ChapterEntity chapter ) {
		this.chapter = chapter;
	}
	
	@Override
	public int createChapter() {
		return chapter.getPosition();
	}
	
	@Override
	public int createSection() {
		return chapter.getSections().size() + 1;
	}
	
	@Override
	public SlideType createType() {
		return SlideType.CHAPTER_ENDING;
	}
}
