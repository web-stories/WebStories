package org.webstories.core.activity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.dao.activity.ChapterPublishedActivity;
import org.webstories.dao.activity.JoinedActivityEntity;
import org.webstories.dao.activity.NewStoryActivityEntity;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.user.UserEntity;

@Stateless
public class ActivityRegistrator implements LocalActivityRegistrator {
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void registerJoinedActivity( Logged logged ) throws UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		UserEntity activityAuthor = entityManager.find( UserEntity.class, logged.getId() );
		JoinedActivityEntity activity = new JoinedActivityEntity( activityAuthor );
		entityManager.persist( activity );
	}
	
	@Override
	public void registerChapterPublishActivity( long idChapter, Logged logged )
	throws UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		ChapterEntity chapter = entityManager.find( ChapterEntity.class, idChapter );
		UserEntity activityAuthor = entityManager.find( UserEntity.class, logged.getId() );
		
		ChapterPublishedActivity activity = new ChapterPublishedActivity( activityAuthor );
		activity.setChapter( chapter );
		entityManager.persist( activity );
	}
	
	@Override
	public void registerNewStoryActivity( long idStory, Logged logged )
	throws UserNotLoggedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		UserEntity activityAuthor = entityManager.find( UserEntity.class, logged.getId() );
		
		NewStoryActivityEntity activity = new NewStoryActivityEntity( activityAuthor );
		activity.setStory( story );
		entityManager.persist( activity );
	}
}
