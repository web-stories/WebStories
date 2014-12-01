package org.webstories.dao.story;

import java.util.List;

import org.webstories.core.story.editor.EditorStoryChapterInput;
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
		String title = modified.getTitle().toString();
		int position = modified.getPosition();
		StoryState state = modified.isPublished() ? StoryState.PUBLISHED : StoryState.DRAFT;
		return ChapterEntity.createContentChapter( story, title, position, state );
	}
	@Override
	protected void update( EditorStoryChapterInput modified, ChapterEntity chapter ) {
		chapter.setTitle( modified.getTitle().toString() );
		chapter.setPosition( modified.getPosition() );
		
		// The published state is changed elsewhere
		// chapter.setState( chapter.getState() );
	}
}
