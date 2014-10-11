package org.webstories.core.security.story;

import java.util.List;

import javax.persistence.EntityManager;

import org.webstories.core.security.PrivilegedUpdate;
import org.webstories.core.story.impl.EditorStoryChapterInput;
import org.webstories.core.story.impl.EditorStoryInput;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.ChapterListUpdater;
import org.webstories.dao.story.StoryEntity;

public class StoryUpdate {
	public static class EditorUpdate implements PrivilegedUpdate<StoryEntity> {
		private EditorStoryInput storyInput;
		private EntityManager entityManager;
		public EditorUpdate( EditorStoryInput storyInput, EntityManager entityManager ) {
			this.storyInput = storyInput;
			this.entityManager = entityManager;
		}
		@Override
		public void run( StoryEntity storyAccessed ) {
			updateChapters( storyAccessed );
		}
		private void updateChapters( StoryEntity storyAccessed ) {
			long idStory = storyAccessed.getId();
			List<ChapterEntity> persistent = storyAccessed.getChapters();
			List<EditorStoryChapterInput> modified = storyInput.getChapters();
			ChapterListUpdater updater = new ChapterListUpdater( idStory, modified, persistent );
			updater.update( entityManager );
		}
	}
}
