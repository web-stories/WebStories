package org.webstories.core.story.facade;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.StoryUtils;
import org.webstories.core.story.editor.EditorStory;
import org.webstories.core.story.editor.EditorStoryDetails;
import org.webstories.core.story.thumb.HomeStory;
import org.webstories.core.validation.ValidationObject;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.story.StoryQueries;

@Stateless
public class StoryAuthoringReader implements LocalStoryAuthoringReader {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	StoryQueries storyQueries;
	
	@Override
	public List<HomeStory> authorStories( Logged logged ) {
		List<HomeStory> result = new ArrayList<HomeStory>();
		for ( StoryEntity story : storyQueries.listAuthorStories( logged.getId() ) ) {
			FacebookEntity author = story.getAuthor().getFacebook();
			result.add( HomeStory.from( author, story ) );
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
	public List<ValidationObject> validateChapter( long chapterId ) {
		ChapterEntity chapter = entityManager.find( ChapterEntity.class, chapterId );
		return StoryUtils.validateChapter( chapter );
	}
}
