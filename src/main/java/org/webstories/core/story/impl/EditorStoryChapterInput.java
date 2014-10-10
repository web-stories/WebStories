package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;
import org.webstories.core.validation.Validatable;

public class EditorStoryChapterInput implements StoryChapter, Validatable {
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
	@Override
	public boolean validate() {
		if ( title.trim().isEmpty() ) {
			return false;
		}
		for ( Validatable section : sections ) {
			if ( !section.validate() ) {
				return false;
			}
		}
		return true;
	}
}
