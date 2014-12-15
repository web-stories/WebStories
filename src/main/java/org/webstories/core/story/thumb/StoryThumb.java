package org.webstories.core.story.thumb;

import org.webstories.core.text.html.HTMLOutput;
import org.webstories.core.user.UserInfo;

public interface StoryThumb {
	Long getId();
	HTMLOutput getTitle();
	HTMLOutput getDescription();
	UserInfo getAuthor();
}
