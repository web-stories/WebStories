package org.webstories.core.story.impl;

import org.webstories.core.story.StorySection;
import org.webstories.core.text.Text;
import org.webstories.dao.story.SectionEntity;

public class EditorStorySection implements StorySection {
	private Long id;
	private String text;
	private Integer position;
	public static EditorStorySection from( SectionEntity sectionEntity ) {
		EditorStorySection section = new EditorStorySection();
		section.id = sectionEntity.getId();
		section.text = Text.from( sectionEntity.getText() ).toString();
		section.position = sectionEntity.getPosition();
		return section;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public String getText() {
		return text;
	}
	@Override
	public Integer getPosition() {
		return position;
	}
}
