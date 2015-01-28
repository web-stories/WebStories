package org.webstories.core.story.viewer;

import org.webstories.core.text.html.HTMLOutput;
import org.webstories.dao.story.ChapterEntity;

public class ChapterSlideFactory implements SlideFactory {
	private ChapterEntity chapter;
	
	public ChapterSlideFactory( ChapterEntity chapter ) {
		this.chapter = chapter;
	}
	
	@Override
	public int createChapter() {
		return chapter.getPosition();
	}
	
	@Override
	public int createSection() {
		return 0;
	}
	
	@Override
	public SlideType createType() {
		return SlideType.CHAPTER;
	}
	
	public HTMLOutput createTitle() {
		return HTMLOutput.fromUnsafeInput( chapter.getTitle() );
	}
}
