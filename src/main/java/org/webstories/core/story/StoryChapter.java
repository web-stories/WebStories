package org.webstories.core.story;

import java.util.List;

public interface StoryChapter {
	String getTitle();
	List<? extends StorySection> getSections();
}
