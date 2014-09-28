package org.webstories.core.story;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.validation.ValidationException;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;

@Stateless
public class StoryCreator implements LocalStoryCreator {
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void createMeta( StoryMeta input ) throws ValidationException {
		if ( !input.validate() ) {
			throw new ValidationException();
		}
		
		StoryEntity story = new StoryEntity();
		entityManager.persist( story );
		
		MetaEntity meta = MetaEntity.from( input );
		meta.setStory( story );
		entityManager.persist( meta );
	}
}
