package org.webstories.core.feed;

import org.webstories.core.text.html.HTMLText;
import org.webstories.core.user.UserInfo;

public class DefaultFeedItem implements FeedItem {
	private UserInfo author;
	private HTMLText content;
	private String date;
	
	public DefaultFeedItem( UserInfo author, HTMLText content, String date ) {
		this.author = author;
		this.content = content;
		this.date = date;
	}
	
	@Override
	public UserInfo getAuthor() {
		return author;
	}
	
	@Override
	public HTMLText getContent() {
		return content;
	}
	
	@Override
	public String getDate() {
		return date;
	}
}
