package org.webstories.core.story.editor;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.Story;
import org.webstories.core.text.html.HTMLOutput;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.StoryEntity;

public class EditorStory implements Story {
	private Long id;
	private HTMLOutput title;
	private HTMLOutput summary;
	private List<EditorStoryChapter> chapters = new ArrayList<EditorStoryChapter>();
	public static EditorStory from( StoryEntity story ) {
		EditorStory editor = new EditorStory();
		editor.id = story.getId();
		editor.title = HTMLOutput.fromUnsafeInput( story.getMeta().getTitle() );
		editor.summary = HTMLOutput.fromUnsafeInput( story.getMeta().getSummary() );
		
		for ( ChapterEntity chapter : story.getChapters() ) {
			EditorStoryChapter storyChapter = EditorStoryChapter.from( chapter );
			editor.chapters.add( storyChapter );
		}
		
		// Check if a chapter is publishable (if it is enabled to publish it from the interface).
		// Only one chapter can be publishable: the first chapter after the previous chapters that
		// were already published.
		for ( int i = 0; i < editor.chapters.size(); i++ ) {
			EditorStoryChapter chapter = editor.chapters.get( i );
			
			// It is pushable if it was not yet been published
			chapter.setPublishable( !chapter.isPublished() );
			
			// If this chapter cannot be published, then do not test the others and let it be null.
			// In this context, null represents a chapter whose publishability cannot be determined.
			if ( chapter.isPublished() == false ) {
				break;
			}
		}
		
		return editor;
	}
	@Override
	public Long getId() {
		return id;
	}
	public HTMLOutput getTitle() {
		return title;
	}
	public HTMLOutput getSummary() {
		return summary;
	}
	@Override
	public List<EditorStoryChapter> getChapters() {
		return chapters;
	}
}
