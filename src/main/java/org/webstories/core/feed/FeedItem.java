package org.webstories.core.feed;

import org.webstories.core.text.html.HTMLText;
import org.webstories.core.user.UserInfo;

public interface FeedItem {
	UserInfo getAuthor();
	HTMLText getContent();
	String getDate();
}
