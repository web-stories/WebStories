package org.webstories.core.story.facade;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.ResourceNotFoundException;
import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.security.PrivilegedUpdate;
import org.webstories.core.security.story.StoryOwnerSecurity;
import org.webstories.core.security.story.StoryRead;
import org.webstories.core.story.StoryUtils;
import org.webstories.core.story.editor.EditorStoryChapter;
import org.webstories.core.story.editor.EditorStoryDetailsInput;
import org.webstories.core.story.editor.EditorStorySection;
import org.webstories.core.story.editor.RemovalResult;
import org.webstories.core.story.editor.RemovedItem;
import org.webstories.core.validation.ValidationException;
import org.webstories.core.validation.ValidationObject;
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
		
		List<ValidationObject> validation = StoryUtils.validateChapter( chapter );
		if ( !validation.isEmpty() ) {
			throw new ValidationException( validation.get( 0 ).toString() );
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
	
	@Override
	public EditorStoryChapter addChapter( long idStory, Logged logged )
	throws AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		
		int position = story.getChapters().size() + 1;
		final ChapterEntity chapter = ChapterEntity.createEmptyChapter( position );
		story.addChapter( chapter );
		
		final SectionEntity section = SectionEntity.createEmptySection( 1 );
		chapter.addSection( section, 0 );
		
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity story ) {
					entityManager.persist( chapter );
					entityManager.persist( section );
				}
			}
		);
		
		return EditorStoryChapter.from( chapter );
	}
	
	@Override
	public RemovalResult removeSection( long idSection, Logged logged )
	throws AccessDeniedException, UserNotLoggedException, ResourceNotFoundException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		final RemovalResult result = new RemovalResult();
		final SectionEntity section = entityManager.find( SectionEntity.class, idSection );
		
		// There are cases where clicking in the remove button too fast can cause double ajax
		// execution.
		// Let's make this exception clear to see if it happens in the wild.
		if ( section == null ) {
			throw new ResourceNotFoundException(
				"Section '" + idSection + "' does not exist anymore"
			);
		}
		
		final ChapterEntity chapter = section.getChapter();
		StoryEntity story = chapter.getStory();
		
		// Should update all sections positions in case one was removed from the middle
		chapter.removeSection( section );
		StoryUtils.refreshPositions( chapter.getSections() );
		
		// If there is no section left in the chapter, it is going to remove the chapter too
		if ( chapter.getSections().isEmpty() ) {
			story.removeChapter( chapter );
			StoryUtils.refreshPositions( story.getChapters() );
		}
		
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity story ) {
					entityManager.remove( section );
					result.setSection( new RemovedItem( section.getId() ) );
					for ( SectionEntity currentSection : chapter.getSections() ) {
						entityManager.merge( currentSection );
					}
					
					// If there is no section left in the chapter, remove the chapter too
					if ( chapter.getSections().isEmpty() ) {
						entityManager.remove( chapter );
						result.setChapter( new RemovedItem( chapter.getId() ) );
						for ( ChapterEntity currentChapter : story.getChapters() ) {
							entityManager.merge( currentChapter );
						}
					}
				}
			}
		);
		
		return result;
	}
	
	@Override
	public EditorStorySection addSection( long idPrevSection, Logged logged )
	throws AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		SectionEntity previousSection =
			entityManager.find( SectionEntity.class, idPrevSection );
		ChapterEntity chapter = previousSection.getChapter();
		StoryEntity story = chapter.getStory();
		
		// Add a new section in the given position
		int newSectionPosition = previousSection.getPosition() + 1;
		int newSectionIndex = newSectionPosition - 1;
		final SectionEntity newSection = SectionEntity.createEmptySection( newSectionPosition );
		chapter.addSection( newSection, newSectionIndex );
		
		// Update the position of all items relative to the newly added section
		final List<SectionEntity> sections = chapter.getSections();
		StoryUtils.refreshPositions( sections );
		
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity story ) {
					// Ensures the id will be set to the returned object
					entityManager.persist( newSection );
					
					// Refresh all items data in the database because position has changed
					for ( SectionEntity currentSection : sections ) {
						entityManager.merge( currentSection );
					}
				}
			}
		);
		
		return EditorStorySection.from( newSection );
	}
	
	@Override
	public EditorStorySection updateSection( long sectionId, final String text, Logged logged )
	throws AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		final SectionEntity section = entityManager.find( SectionEntity.class, sectionId );
		StoryEntity story = section.getChapter().getStory();
		
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity story ) {
					section.setText( text );
					entityManager.merge( section );
				};
			}
		);
		
		return EditorStorySection.from( section );
	}
	
	@Override
	public EditorStoryChapter updateChapter( long chapterId, final String title, Logged logged )
	throws AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		final ChapterEntity chapter = entityManager.find( ChapterEntity.class, chapterId );
		StoryEntity story = chapter.getStory();
		
		new StoryOwnerSecurity( logged ).updatePrivileged(
			new StoryRead.DefaultRead( story.getId(), entityManager ),
			new PrivilegedUpdate<StoryEntity>() {
				@Override
				public void run( StoryEntity story ) {
					chapter.setTitle( title );
					entityManager.merge( chapter );
				};
			}
		);
		
		return EditorStoryChapter.from( chapter );
	}
}
