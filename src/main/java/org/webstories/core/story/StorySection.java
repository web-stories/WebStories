package org.webstories.core.story;

import org.webstories.core.text.Text;
import org.webstories.dao.NumerableEntity;

public interface StorySection extends NumerableEntity {
	Long getId();
	Text getText();
	Integer getPosition();
}
