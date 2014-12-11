package org.webstories.core.story.facade;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.security.story.StoryOwnerSecurity;
import org.webstories.core.security.story.StoryRead;
import org.webstories.core.story.StoryUtils;
import org.webstories.core.story.editor.EditorStory;
import org.webstories.core.story.editor.EditorStoryDetails;
import org.webstories.core.story.thumb.FeaturedStory;
import org.webstories.core.story.thumb.HomeStory;
import org.webstories.core.story.viewer.StoryViewer;
import org.webstories.core.story.viewer.StoryViewerDetails;
import org.webstories.core.validation.ValidationObject;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.story.StoryQueries;

@Stateless
public class StoryReader implements LocalStoryReader {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	StoryQueries storyQueries;
	
	@Override
	public List<HomeStory> userStories( Logged logged ) {
		List<HomeStory> result = new ArrayList<HomeStory>();
		for ( StoryEntity story : storyQueries.listAuthorStories( logged.getId() ) ) {
			FacebookEntity author = story.getAuthor().getFacebook();
			result.add( HomeStory.from( author, story ) );
		}
		return result;
	}
	
	@Override
	public List<FeaturedStory> featuredStories() {
		List<FeaturedStory> result = new ArrayList<FeaturedStory>();
		for ( StoryEntity story : storyQueries.listLastPublishedStories( 3 ) ) {
			MetaEntity meta = story.getMeta();
			FacebookEntity author = story.getAuthor().getFacebook();
			result.add( FeaturedStory.from( author, meta ) );
		}
		return result;
	}
	
	@Override
	public EditorStoryDetails storyDetails( long idStory ) {
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		MetaEntity meta = story.getMeta();
		return EditorStoryDetails.from( meta );
	}
	
	@Override
	public EditorStory storyEditor( long idStory ) {
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		return EditorStory.from( story );
	}
	
	@Override
	public StoryViewer storyViewer( long idStory ) {
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		return StoryViewer.createPublic( story );
	}
	
	@Override
	public StoryViewer storyPreviewer( long idStory, Logged logged )
	throws AccessDeniedException, UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		// Can only preview if the logged user owns this story
		StoryEntity story = new StoryOwnerSecurity( logged )
			.readPrivileged( new StoryRead.DefaultRead( idStory, entityManager ) );
		
		return StoryViewer.createPreview( story );
	}
	
	@Override
	public StoryViewerDetails storyViewerDetails( long idStory ) {
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		MetaEntity meta = story.getMeta();
		return StoryViewerDetails.from( meta );
	}
	
	@Override
	public List<ValidationObject> validateChapter( long chapterId ) {
		ChapterEntity chapter = entityManager.find( ChapterEntity.class, chapterId );
		return StoryUtils.validateChapter( chapter );
	}
}
