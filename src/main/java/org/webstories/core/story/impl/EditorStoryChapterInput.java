package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;

public class EditorStoryChapterInput implements StoryChapter {
	private String title;
	private List<EditorStorySectionInput> sections = new ArrayList<EditorStorySectionInput>();
	@Override
	public String getTitle() {
		return title;
	}
	@Override
	public List<EditorStorySectionInput> getSections() {
		return sections;
	}
}
