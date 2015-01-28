package org.webstories.core.security.story;

import javax.persistence.EntityManager;

import org.webstories.core.security.PrivilegedRead;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.StoryEntity;

public class StoryRead {
	public static class DefaultRead implements PrivilegedRead<StoryEntity> {
		private EntityManager entityManager;
		private long idStory;
		public DefaultRead( long idStory, EntityManager entityManager ) {
			this.entityManager = entityManager;
			this.idStory = idStory;
		}
		@Override
		public StoryEntity run() {
			return entityManager.find( StoryEntity.class, idStory );
		}
	}
	public static class ChapterRead implements PrivilegedRead<ChapterEntity> {
		private ChapterEntity chapter;
		public ChapterRead( ChapterEntity chapter ) {
			this.chapter = chapter;
		}
		@Override
		public ChapterEntity run() {
			return chapter;
		}
	}
}
