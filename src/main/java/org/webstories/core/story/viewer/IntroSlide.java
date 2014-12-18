package org.webstories.core.story.viewer;

import org.webstories.core.text.html.HTMLOutput;

public class IntroSlide extends StorySlide {
	private HTMLOutput title;
	private HTMLOutput summary;
	
	public IntroSlide( IntroSlideFactory factory ) {
		super( factory );
		this.title = factory.createTitle();
		this.summary = factory.createSummary();
	}
	
	public HTMLOutput getTitle() {
		return title;
	}
	
	public HTMLOutput getSummary() {
		return summary;
	}
}
