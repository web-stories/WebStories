package org.webstories.core.story;

import java.util.List;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;

@Local
public interface LocalStoryReader {
	List<HomeStory> userStories( Logged logged );
	List<FeaturedStory> featuredStories();
	StoryDetails storyDetails( long idStory );
	StoryEditorData storyEditor( long idStory );
}
