package org.webstories.core.story;

import org.webstories.dao.story.MetaEntity;

public class StoryEditorData implements Story {
	private Long id;
	private String title;
	public static StoryEditorData from( MetaEntity meta ) {
		StoryEditorData editor = new StoryEditorData();
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
