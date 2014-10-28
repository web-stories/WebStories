package org.webstories.core.text;

import org.codehaus.jackson.annotate.JsonValue;

public class Text {
	private String content;
	protected Text( String content ) {
		this.content = content;
	}
	public static Text from( String content ) {
		return new Text( content );
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
