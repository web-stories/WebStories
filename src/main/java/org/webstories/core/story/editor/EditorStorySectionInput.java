package org.webstories.core.story.editor;

import org.webstories.core.story.StorySection;
import org.webstories.core.text.PlainText;
import org.webstories.core.validation.Validatable;

public class EditorStorySectionInput implements StorySection, Validatable {
	private PlainText text;
	private Long id;
	private Integer position;
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public PlainText getText() {
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
