package org.webstories.core.security.story;

import javax.persistence.EntityManager;

import org.webstories.core.security.PrivilegedUpdate;
import org.webstories.core.story.impl.EditorStoryInput;
import org.webstories.dao.story.StoryEntity;

public class StoryUpdate {
	public static class EditorUpdate implements PrivilegedUpdate<StoryEntity> {
		private EditorStoryInput story;
		private EntityManager entityManager;
		public EditorUpdate( EditorStoryInput story, EntityManager entityManager ) {
			this.story = story;
			this.entityManager = entityManager;
		}
		@Override
		public void run( StoryEntity object ) {
			// TODO update
		}
	}
}
