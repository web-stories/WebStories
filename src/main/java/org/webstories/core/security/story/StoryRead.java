package org.webstories.core.security.story;

import org.webstories.core.security.PrivilegedRead;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.story.StoryQueries;

public class StoryRead {
	public static class DefaultRead implements PrivilegedRead<StoryEntity> {
		private StoryQueries queries;
		private long idStory;
		public DefaultRead( long idStory, StoryQueries queries ) {
			this.queries = queries;
			this.idStory = idStory;
		}
		@Override
		public StoryEntity run() {
			return queries.findByPrimaryKey( idStory );
		}
	}
}
