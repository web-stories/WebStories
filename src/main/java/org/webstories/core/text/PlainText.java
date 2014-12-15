package org.webstories.core.text;


public class PlainText extends TextDecorator {
	protected PlainText( String content ) {
		super( content );
	}
	public static PlainText from( String content ) {
		return new PlainText( content );
	}
}
