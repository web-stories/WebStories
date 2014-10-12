package org.webstories.core.security.story;


import java.util.List;

import javax.persistence.EntityManager;

import org.webstories.core.security.PrivilegedUpdate;
import org.webstories.core.story.impl.EditorStoryChapterInput;
import org.webstories.core.story.impl.EditorStoryInput;
import org.webstories.core.story.impl.EditorStorySectionInput;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.ChapterListUpdater;
import org.webstories.dao.story.SectionEntity;
import org.webstories.dao.story.SectionListUpdater;
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
		public void run( StoryEntity story ) {
			List<ChapterEntity> updatedChapters = updateChapters( story, storyInput );
			for ( int index = 0; index < updatedChapters.size(); index += 1 ) {
				ChapterEntity chapter = updatedChapters.get( index );
				EditorStoryChapterInput input = storyInput.getChapters().get( index );
				updateSections( chapter, input );
			}
		}
		private List<ChapterEntity> updateChapters( StoryEntity story, EditorStoryInput input ) {
			List<ChapterEntity> persistent = story.getChapters();
			List<EditorStoryChapterInput> modified = input.getChapters();
			return new ChapterListUpdater( story, modified, persistent )
				.update( entityManager );
		}
		private void updateSections( ChapterEntity chapter, EditorStoryChapterInput input ) {
			List<SectionEntity> persistent = chapter.getSections();
			List<EditorStorySectionInput> modified = input.getSections();
			new SectionListUpdater( chapter, modified, persistent )
				.update( entityManager );
		}
	}
}
