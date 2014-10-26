package org.webstories.core.text;


public class Message {
	private String content;
	protected Message( String content ) {
		this.content = content;
	}
	public static Message from( String content ) {
		return new Message( content );
	}
	protected String getContent() {
		return content;
	}
}
