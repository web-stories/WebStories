package org.webstories.core.story;

import java.util.List;

import org.webstories.core.text.Text;
import org.webstories.dao.NumerableEntity;

public interface StoryChapter extends NumerableEntity {
	Long getId();
	Text getTitle();
	Integer getPosition();
	boolean isPublished();
	List<? extends StorySection> getSections();
}
