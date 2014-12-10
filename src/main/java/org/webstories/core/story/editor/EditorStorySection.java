package org.webstories.core.story.editor;

import org.webstories.core.story.StorySection;
import org.webstories.core.text.Text;
import org.webstories.dao.story.SectionEntity;

public class EditorStorySection implements StorySection {
	private Long id;
	private Text text;
	private Integer position;
	public static EditorStorySection from( SectionEntity sectionEntity ) {
		EditorStorySection section = new EditorStorySection();
		section.id = sectionEntity.getId();
		section.text = Text.from( sectionEntity.getText() );
		section.position = sectionEntity.getPosition();
		return section;
	}
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
}
