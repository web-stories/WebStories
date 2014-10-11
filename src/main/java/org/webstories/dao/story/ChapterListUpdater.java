package org.webstories.dao.story;

import java.util.List;

import org.webstories.core.story.impl.EditorStoryChapterInput;
import org.webstories.dao.DBListUpdater;

public class ChapterListUpdater extends DBListUpdater<EditorStoryChapterInput, ChapterEntity> {
	private long idStory;
	public ChapterListUpdater(
		long idStory,
		List<EditorStoryChapterInput> modified,
		List<ChapterEntity> persistent
	) {
		super( modified, persistent );
		this.idStory = idStory;
	}
	@Override
	protected ChapterEntity createPersistent( EditorStoryChapterInput modified ) {
		return ChapterEntity.from( idStory, modified );
	}
}
