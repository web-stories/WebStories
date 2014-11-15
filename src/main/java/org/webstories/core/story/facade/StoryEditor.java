package org.webstories.core.story.facade;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.security.PrivilegedUpdate;
import org.webstories.core.security.story.StoryOwnerSecurity;
import org.webstories.core.security.story.StoryRead;
import org.webstories.core.security.story.StoryUpdate;
import org.webstories.core.story.StoryUtils;
import org.webstories.core.story.editor.EditorStoryDetailsInput;
import org.webstories.core.story.editor.EditorStoryInput;
import org.webstories.core.validation.ValidationException;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.SectionEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.story.StoryQueries;
import org.webstories.dao.story.StoryState;

@Stateless
public class StoryEditor implements LocalStoryEditor {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	StoryQueries storyQueries;
	
	@Override
	public void updateMeta( long idStory, final EditorStoryDetailsInput input, Logged logged )
	throws ValidationException, AccessDeniedException {
		StoryOwnerSecurity security = new StoryOwnerSecurity( logged );
		if ( !input.validate() ) {
			throw new ValidationException();
		}
		security.updatePrivileged(
			new StoryRead.DefaultRead( idStory, entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity story ) {
					MetaEntity meta = story.getMeta();
					meta.update( input );
					entityManager.merge( meta );
				}
			}
		);
	}
	
	@Override
	public void updateStory( EditorStoryInput story, Logged logged )
	throws ValidationException, AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		if ( !story.validate() ) {
			throw new ValidationException();
		}
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new StoryUpdate.EditorUpdate( story, entityManager )
		);
	}
	
	@Override
	public void removeStory( long idStory, Logged logged )
	throws ValidationException, AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		final StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		
		if ( !StoryUtils.isRemovable( story ) ) {
			String msg = "A story cannot be removed unless it contains only 1 chapter and 1 "
				+ "section";
			throw new ValidationException( msg );
		}
		
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity object ) {
					// Need to remove the meta entity first.
					// There is a database-level Foreign Key constraint between meta and story,
					// if we try to remove the story, a database error occurs because of
					// the constraint.
					// http://stackoverflow.com/a/15220994/1400037
					entityManager.remove( story.getMeta() );
					entityManager.remove( story );
				}
			}
		);
	}
	
	@Override
	public void publishChapter( long idChapter, Logged logged )
	throws ValidationException, AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		final ChapterEntity chapter = entityManager.find( ChapterEntity.class, idChapter );
		StoryEntity story = chapter.getStory();
		
		if ( chapter.getTitle().isEmpty() ) {
			throw new ValidationException( "The chapter title should not be empty" );
		}
		
		if ( chapter.getSections().isEmpty() ) {
			throw new ValidationException( "The chapter sections should not be empty" );
		}
		
		for( SectionEntity section : chapter.getSections() ) {
			if ( section.getText().isEmpty() ) {
				throw new ValidationException( "No section should be empty" );
			}
		}
		
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity object ) {
					chapter.setState( StoryState.PUBLISHED );
				}
			}
		);
	}
}
