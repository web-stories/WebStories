package org.webstories.core.story.facade;

import java.util.List;

import javax.ejb.Local;

import org.webstories.core.story.thumb.FeaturedStory;

@Local
public interface LocalStoryReader {
	List<FeaturedStory> featuredStories();
}
