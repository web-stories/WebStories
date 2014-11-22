package org.webstories.core.story.thumb;

import org.webstories.core.text.html.HTMLText;
import org.webstories.core.user.UserInfo;

public interface StoryThumb {
	Long getId();
	HTMLText getTitle();
	HTMLText getDescription();
	UserInfo getAuthor();
}
