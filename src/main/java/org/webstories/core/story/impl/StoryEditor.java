package org.webstories.core.story.impl;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.security.story.StoryOwnerSecurity;
import org.webstories.core.security.story.StoryRead;
import org.webstories.core.security.story.StoryUpdate;
import org.webstories.core.story.LocalStoryEditor;
import org.webstories.core.validation.ValidationException;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryQueries;

@Stateless
public class StoryEditor implements LocalStoryEditor {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	StoryQueries storyQueries;
	
	@Override
	public void updateMeta( long idStory, EditorStoryDetailsInput input )
	throws ValidationException {
		if ( !input.validate() ) {
			throw new ValidationException();
		}
		MetaEntity meta = storyQueries.findMetaByPrimaryKey( idStory );
		meta.update( input );
		entityManager.merge( meta );
	}
	
	@Override
	public void updateStory( EditorStoryInput story, Logged logged )
	throws ValidationException, AccessDeniedException {
		StoryOwnerSecurity security = new StoryOwnerSecurity( logged );
		if ( !story.validate() ) {
			throw new ValidationException();
		}
		security.updatePrivileged(
			new StoryRead.Default( story.getId(), storyQueries ),
			new StoryUpdate.Editor( story, entityManager )
		);
	}
}
