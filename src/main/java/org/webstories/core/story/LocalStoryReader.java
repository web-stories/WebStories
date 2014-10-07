package org.webstories.core.story;

import java.util.List;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.impl.FeaturedStory;
import org.webstories.core.story.impl.HomeStory;
import org.webstories.core.story.impl.StoryDetails;
import org.webstories.core.story.impl.StoryEditorData;

@Local
public interface LocalStoryReader {
	List<HomeStory> userStories( Logged logged );
	List<FeaturedStory> featuredStories();
	StoryDetails storyDetails( long idStory );
	StoryEditorData storyEditor( long idStory );
}
