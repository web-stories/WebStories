package org.webstories.core.story;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
	public void updateMeta( long idStory, StoryMetaInput input ) throws ValidationException {
		if ( !input.validate() ) {
			throw new ValidationException();
		}
		MetaEntity meta = storyQueries.findMetaByPrimaryKey( idStory );
		meta.update( input );
		entityManager.merge( meta );
	}
}
