package org.webstories.core.story.impl;

import org.webstories.core.story.Story;
import org.webstories.dao.story.MetaEntity;

public class EditorStory implements Story {
	private Long id;
	private String title;
	public static EditorStory from( MetaEntity meta ) {
		EditorStory editor = new EditorStory();
		editor.id = meta.getId();
		editor.title = meta.getTitle();
		return editor;
	}
	@Override
	public Long getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
}
