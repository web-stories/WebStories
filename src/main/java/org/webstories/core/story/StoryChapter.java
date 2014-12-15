package org.webstories.core.story;

import java.util.List;

import org.webstories.core.text.TextDecorator;
import org.webstories.dao.NumerableEntity;

public interface StoryChapter extends NumerableEntity {
	Long getId();
	TextDecorator getTitle();
	Integer getPosition();
	boolean isPublished();
	List<? extends StorySection> getSections();
}
