package org.webstories.core.story;

import org.webstories.dao.NumerableEntity;

public interface StorySection extends NumerableEntity {
	Long getId();
	String getText();
	Integer getPosition();
}
