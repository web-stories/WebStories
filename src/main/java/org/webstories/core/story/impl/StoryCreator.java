package org.webstories.core.story.impl;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.LocalStoryCreator;
import org.webstories.core.validation.ValidationException;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.user.UserEntity;
import org.webstories.dao.user.UserQueries;

@Stateless
public class StoryCreator implements LocalStoryCreator {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	UserQueries userQueries;
	
	@Override
	public void createMeta( EditorStoryDetailsInput input, Logged logged ) throws ValidationException {
		if ( !input.validate() ) {
			throw new ValidationException();
		}
		
		UserEntity author = userQueries.findByPrimaryKey( logged.getId() );
		
		StoryEntity story = new StoryEntity();
		story.setAuthor( author );
		entityManager.persist( story );
		
		MetaEntity meta = MetaEntity.from( input );
		meta.setStory( story );
		entityManager.persist( meta );
	}
}
