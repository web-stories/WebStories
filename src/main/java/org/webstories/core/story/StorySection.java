package org.webstories.core.story;

import org.webstories.core.text.TextDecorator;
import org.webstories.dao.NumerableEntity;

public interface StorySection extends NumerableEntity {
	Long getId();
	TextDecorator getText();
	Integer getPosition();
}
