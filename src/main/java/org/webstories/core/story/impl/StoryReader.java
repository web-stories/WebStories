package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.LocalStoryReader;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.story.StoryQueries;

@Stateless
public class StoryReader implements LocalStoryReader {
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
		for ( StoryEntity story : storyQueries.listLastStories( 3 ) ) {
			MetaEntity meta = story.getMeta();
			FacebookEntity author = story.getAuthor().getFacebook();
			result.add( FeaturedStory.from( author, meta ) );
		}
		return result;
	}
	
	@Override
	public EditorStoryDetails storyDetails( long idStory ) {
		StoryEntity story = storyQueries.findByPrimaryKey( idStory );
		MetaEntity meta = story.getMeta();
		return EditorStoryDetails.from( meta );
	}
	
	@Override
	public EditorStory storyEditor( long idStory ) {
		StoryEntity story = storyQueries.findByPrimaryKey( idStory );
		return EditorStory.from( story );
	}
	
	@Override
	public StoryViewer storyViewer( long idStory ) {
		StoryEntity story = storyQueries.findByPrimaryKey( idStory );
		return StoryViewer.from( story );
	}
	
	@Override
	public StoryViewerDetails storyViewerDetails( long idStory ) {
		StoryEntity story = storyQueries.findByPrimaryKey( idStory );
		MetaEntity meta = story.getMeta();
		return StoryViewerDetails.from( meta );
	}
}
