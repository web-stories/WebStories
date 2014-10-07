package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.Story;
import org.webstories.core.story.StoryChapter;

public class EditorStoryInput implements Story {
	private Long id;
	private List<StoryChapter> chapters = new ArrayList<StoryChapter>();
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public List<StoryChapter> getChapters() {
		return chapters;
	}
}
