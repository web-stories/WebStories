package org.webstories.core.story.impl;

import org.webstories.core.story.StorySection;
import org.webstories.core.validation.Validatable;

public class EditorStorySectionInput implements StorySection, Validatable {
	private String text;
	@Override
	public String getText() {
		return text;
	}
	@Override
	public boolean validate() {
		return !text.trim().isEmpty();
	}
}
