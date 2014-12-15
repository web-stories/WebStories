package org.webstories.core.feed.item;

import org.webstories.core.user.UserInfo;

public class DefaultFeedItem implements FeedItem {
	private UserInfo author;
	private FeedContent content;
	private String date;
	private FeedType type;
	
	public DefaultFeedItem( FeedFactory factory ) {
		this.author = factory.createAuthor();
		this.content = factory.createContent();
		this.date = factory.createDate();
		this.type = factory.createType();
	}
	
	@Override
	public UserInfo getAuthor() {
		return author;
	}
	
	@Override
	public FeedContent getContent() {
		return content;
	}
	
	@Override
	public String getDate() {
		return date;
	}
	
	@Override
	public FeedType getType() {
		return type;
	}
}
