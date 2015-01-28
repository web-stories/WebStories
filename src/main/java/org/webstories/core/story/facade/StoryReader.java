package org.webstories.core.story.facade;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.story.thumb.FeaturedStory;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.story.StoryQueries;

@Stateless
public class StoryReader implements LocalStoryReader {
	@EJB
	StoryQueries storyQueries;
	
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
}
