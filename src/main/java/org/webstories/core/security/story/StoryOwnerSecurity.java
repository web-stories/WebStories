package org.webstories.core.security.story;

import org.webstories.core.auth.Logged;
import org.webstories.core.security.DefaultSecurity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.user.UserEntity;

public class StoryOwnerSecurity extends DefaultSecurity<StoryEntity> {
	private Logged logged;
	public StoryOwnerSecurity( Logged logged ) {
		this.logged = logged;
	}
	@Override
	public boolean isAccessible( StoryEntity storyAccessed ) {
		UserEntity owner = storyAccessed.getAuthor();
		
		if ( !logged.getId().equals( owner.getId() ) ) {
			return false;
		}
		
		return true;
	}
}
