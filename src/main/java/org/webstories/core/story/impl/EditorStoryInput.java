package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.Story;

public class EditorStoryInput implements Story {
	private Long id;
	private List<EditorStoryChapterInput> chapters = new ArrayList<EditorStoryChapterInput>();
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public List<EditorStoryChapterInput> getChapters() {
		return chapters;
	}
}
