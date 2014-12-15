package org.webstories.core.feed.item;

public class JoinedContent extends FeedContent {
	private String message;
	
	public JoinedContent( String message ) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
}
