package org.webstories.core.story;

import java.util.List;

public interface Story {
	Long getId();
	List<StoryChapter> getChapters();
}
