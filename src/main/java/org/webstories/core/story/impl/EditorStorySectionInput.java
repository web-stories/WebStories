package org.webstories.core.story.impl;

import org.webstories.core.story.StorySection;

public class EditorStorySectionInput implements StorySection {
	private String text;
	@Override
	public String getText() {
		return text;
	}
}
