package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;
import org.webstories.core.story.StorySection;

public class EditorStoryChapterInput implements StoryChapter {
	private String title;
	private List<StorySection> sections = new ArrayList<StorySection>();
	@Override
	public String getTitle() {
		return title;
	}
	@Override
	public List<StorySection> getSections() {
		return sections;
	}
}
