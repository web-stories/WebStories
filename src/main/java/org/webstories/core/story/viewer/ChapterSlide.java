package org.webstories.core.story.viewer;

import org.webstories.core.text.html.HTMLOutput;

public class ChapterSlide extends StorySlide {
	private HTMLOutput title;
	
	public ChapterSlide( ChapterSlideFactory factory ) {
		super( factory );
		this.title = factory.createTitle();
	}
	
	public HTMLOutput getTitle() {
		return title;
	}
}
