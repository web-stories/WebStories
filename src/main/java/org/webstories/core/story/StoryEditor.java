package org.webstories.core.story;

import org.webstories.dao.story.MetaEntity;

public class StoryEditor implements Story {
	private Long id;
	private String title;
	public static StoryEditor from( MetaEntity meta ) {
		StoryEditor editor = new StoryEditor();
		editor.id = meta.getId();
		editor.title = meta.getTitle();
		return editor;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public String getTitle() {
		return title;
	}
}
