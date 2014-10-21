package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.Story;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;

public class EditorStory implements Story {
	private Long id;
	private String title;
	private List<EditorStoryChapter> chapters = new ArrayList<EditorStoryChapter>();
	public static EditorStory from( MetaEntity meta ) {
		EditorStory editor = new EditorStory();
		editor.id = meta.getId();
		editor.title = meta.getTitle();
		return editor;
	}
	public static EditorStory from( StoryEntity story ) {
		EditorStory editor = new EditorStory();
		editor.id = story.getId();
		editor.title = story.getMeta().getTitle();
		for ( ChapterEntity chapter : story.getChapters() ) {
			EditorStoryChapter storyChapter = EditorStoryChapter.from( chapter );
			editor.chapters.add( storyChapter );
		}
		return editor;
	}
	@Override
	public Long getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	@Override
	public List<EditorStoryChapter> getChapters() {
		return chapters;
	}
}
