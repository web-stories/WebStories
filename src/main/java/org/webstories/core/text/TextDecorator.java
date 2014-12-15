package org.webstories.core.text;

import org.codehaus.jackson.annotate.JsonValue;

public abstract class TextDecorator {
	private String content;
	
	protected TextDecorator( String content ) {
		this.content = content;
	}
	
	protected String getContent() {
		return content;
	}
	
	public boolean isEmpty() {
		return content.isEmpty();
	}
	
	@Override
	@JsonValue
	public String toString() {
		return content;
	}
}
