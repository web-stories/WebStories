package org.webstories.core.story.impl;

import org.webstories.core.story.StorySection;
import org.webstories.core.text.Text;
import org.webstories.core.validation.Validatable;

public class EditorStorySectionInput implements StorySection, Validatable {
	private Text text;
	private Long id;
	private Integer position;
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public Text getText() {
		return text;
	}
	@Override
	public Integer getPosition() {
		return position;
	}
	@Override
	public boolean validate() {
		return true;
	}
}
