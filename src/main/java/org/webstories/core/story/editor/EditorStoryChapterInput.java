package org.webstories.core.story.editor;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.webstories.core.story.StoryChapter;
import org.webstories.core.text.PlainText;
import org.webstories.core.validation.Validatable;

// Prevent "unrecognized field error for 'publishable'" when saving the chapter
@JsonIgnoreProperties( ignoreUnknown = true )

public class EditorStoryChapterInput implements StoryChapter, Validatable {
	private Long id;
	private PlainText title;
	private Integer position;
	private boolean published;
	private List<EditorStorySectionInput> sections = new ArrayList<EditorStorySectionInput>();
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public PlainText getTitle() {
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
	@Override
	public boolean isPublished() {
		return published;
	}
}
