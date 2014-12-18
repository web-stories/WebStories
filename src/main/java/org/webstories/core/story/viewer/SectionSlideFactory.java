package org.webstories.core.story.viewer;

import org.webstories.core.text.html.ElementsProcessor;
import org.webstories.core.text.html.HTMLOutput;
import org.webstories.dao.story.SectionEntity;

public class SectionSlideFactory implements SlideFactory {
	private SectionEntity section;
	
	public SectionSlideFactory( SectionEntity section ) {
		this.section = section;
	}
	
	@Override
	public int createChapter() {
		return section.getChapter().getPosition();
	}
	
	@Override
	public int createSection() {
		return section.getPosition();
	}
	
	@Override
	public SlideType createType() {
		return SlideType.SECTION;
	}
	
	public HTMLOutput createText() {
		HTMLOutput text = HTMLOutput.fromUnsafeInput( section.getText() );
		text.accept( new ElementsProcessor.Converter() );
		return text;
	}
}
