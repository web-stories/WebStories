package org.webstories.core.story.editor;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.Story;
import org.webstories.core.validation.Validatable;

public class EditorStoryInput implements Story, Validatable {
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
	@Override
	public boolean validate() {
		for ( Validatable chapter : chapters ) {
			if ( !chapter.validate() ) {
				return false;
			}
		}
		return true;
	}
}
