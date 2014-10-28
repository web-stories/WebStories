package org.webstories.core.text;

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
	public String toString() {
		return content;
	}
}
