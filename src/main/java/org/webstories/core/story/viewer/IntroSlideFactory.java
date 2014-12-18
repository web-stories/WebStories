package org.webstories.core.story.viewer;

import org.webstories.core.text.html.HTMLOutput;
import org.webstories.dao.story.MetaEntity;

public class IntroSlideFactory implements SlideFactory {
	private MetaEntity meta;
	
	public IntroSlideFactory( MetaEntity meta ) {
		this.meta = meta;
	}
	
	@Override
	public int createChapter() {
		return 0;
	}
	
	@Override
	public int createSection() {
		return 0;
	}
	
	@Override
	public SlideType createType() {
		return SlideType.INTRO;
	}
	
	public HTMLOutput createTitle() {
		return HTMLOutput.fromUnsafeInput( meta.getTitle() );
	}
	
	public HTMLOutput createSummary() {
		return HTMLOutput.fromUnsafeInput( meta.getSummary() );
	}
}
