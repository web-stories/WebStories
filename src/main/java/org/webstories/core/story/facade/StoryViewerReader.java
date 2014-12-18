package org.webstories.core.story.facade;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.security.story.StoryOwnerSecurity;
import org.webstories.core.security.story.StoryRead;
import org.webstories.dao.story.StoryEntity;

@Stateless
public class StoryViewerReader implements LocalStoryViewerReader {
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public boolean isPubliclyViewable( long idStory ) {
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		return story != null;
	}
	@Override
	public boolean isPreviewable( long idStory, Logged logged ) {
		StoryOwnerSecurity security = new StoryOwnerSecurity( logged );
		try {
			security.readPrivileged( new StoryRead.DefaultRead( idStory, entityManager ) );
			return true;
		} catch ( AccessDeniedException e ) {
			return false;
		}
	}
}
