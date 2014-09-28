package org.webstories.core.story;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryQueries;

@Stateless
public class StoryReader implements LocalStoryReader {
	@EJB
	StoryQueries storyQueries;
	
	@Override
	public List<StoryMeta> userStories( Logged logged ) {
		List<StoryMeta> result = new ArrayList<StoryMeta>();
		for ( MetaEntity meta : storyQueries.listAuthorStories( logged.getId() ) ) {
			result.add( StoryMetaView.from( meta ) );
		}
		return result;
	}
}
