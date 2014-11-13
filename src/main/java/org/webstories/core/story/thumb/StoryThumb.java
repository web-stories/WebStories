package org.webstories.core.story.thumb;

import org.webstories.core.text.html.HTMLText;

public interface StoryThumb {
	Long getId();
	HTMLText getTitle();
	HTMLText getDescription();
	String getAuthor();
	String getAuthorAvatar();
	String getAuthorProfile();
}
