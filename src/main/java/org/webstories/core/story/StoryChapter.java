package org.webstories.core.story;

import java.util.List;

import org.webstories.dao.NumerableEntity;

public interface StoryChapter extends NumerableEntity {
	Long getId();
	String getTitle();
	Integer getPosition();
	List<? extends StorySection> getSections();
}
