package org.webstories.dao.story;

import java.util.List;

import org.webstories.core.story.impl.EditorStoryChapterInput;
import org.webstories.dao.DBListUpdater;

public class ChapterListUpdater extends DBListUpdater<EditorStoryChapterInput, ChapterEntity> {
	private StoryEntity story;
	public ChapterListUpdater(
		StoryEntity persistentStory,
		List<EditorStoryChapterInput> modified,
		List<ChapterEntity> persistent
	) {
		super( modified, persistent );
		this.story = persistentStory;
	}
	@Override
	protected ChapterEntity create( EditorStoryChapterInput modified ) {
		ChapterEntity chapter = new ChapterEntity();
		chapter.setStory( story );
		chapter.setTitle( modified.getTitle() );
		return chapter;
	}
	@Override
	protected void update( EditorStoryChapterInput modified, ChapterEntity persistent ) {
		persistent.setTitle( modified.getTitle() );
	}
}
