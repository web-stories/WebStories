package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;
import org.webstories.core.text.Text;
import org.webstories.core.validation.Validatable;

public class EditorStoryChapterInput implements StoryChapter, Validatable {
	private Long id;
	private Text title;
	private Integer position;
	private List<EditorStorySectionInput> sections = new ArrayList<EditorStorySectionInput>();
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public Text getTitle() {
		return title;
	}
	@Override
	public Integer getPosition() {
		return position;
	}
	@Override
	public List<EditorStorySectionInput> getSections() {
		return sections;
	}
	@Override
	public boolean validate() {
		for ( Validatable section : sections ) {
			if ( !section.validate() ) {
				return false;
			}
		}
		return true;
	}
}
