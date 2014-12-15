package org.webstories.core.feed.item;

import org.webstories.core.user.UserInfo;

public interface FeedItem {
	UserInfo getAuthor();
	FeedContent getContent();
	String getDate();
	FeedType getType();
}
