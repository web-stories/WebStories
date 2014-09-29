package org.webstories.core.story;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;
import org.webstories.dao.story.StoryQueries;

@Stateless
public class StoryReader implements LocalStoryReader {
	@EJB
	StoryQueries storyQueries;
	
	@Override
	public List<HomeStoryItem> userStories( Logged logged ) {
		List<HomeStoryItem> result = new ArrayList<HomeStoryItem>();
		for ( StoryEntity story : storyQueries.listAuthorStories( logged.getId() ) ) {
			MetaEntity meta = story.getMeta();
			FacebookEntity author = story.getAuthor().getFacebook();
			result.add( HomeStoryItem.from( author, meta ) );
		}
		return result;
	}
}
