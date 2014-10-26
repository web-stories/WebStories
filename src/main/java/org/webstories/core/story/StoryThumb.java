package org.webstories.core.story;

import org.webstories.core.text.html.HTMLMessage;

public interface StoryThumb {
	Long getId();
	HTMLMessage getTitle();
	HTMLMessage getDescription();
	String getAuthor();
}
