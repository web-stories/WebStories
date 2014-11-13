package org.webstories.core.story.editor;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.Story;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.StoryEntity;

public class EditorStory implements Story {
	private Long id;
	private HTMLText title;
	private List<EditorStoryChapter> chapters = new ArrayList<EditorStoryChapter>();
	public static EditorStory from( StoryEntity story ) {
		EditorStory editor = new EditorStory();
		editor.id = story.getId();
		editor.title = HTMLText.fromPlainText( story.getMeta().getTitle() );
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
	public HTMLText getTitle() {
		return title;
	}
	@Override
	public List<EditorStoryChapter> getChapters() {
		return chapters;
	}
}
