package org.webstories.core.story.viewer;

import org.webstories.core.text.html.HTMLOutput;

public class SectionSlide extends StorySlide {
	private HTMLOutput text;
	
	public SectionSlide( SectionSlideFactory factory ) {
		super( factory );
		this.text = factory.createText();
	}
	
	public HTMLOutput getText() {
		return text;
	}
}
