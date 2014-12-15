package org.webstories.core.text.html;

import java.util.Iterator;
import java.util.TreeSet;

import org.webstories.core.text.ManipulableText;
import org.webstories.core.text.TextDecorator;

public class HTMLOutput extends TextDecorator implements ProcessorVisitable, ManipulableText {
	private String current;
	private final String content;
	private TreeSet<ProcessorVisitor> processors = new TreeSet<ProcessorVisitor>();
	
	private HTMLOutput( String text ) {
		super( text );
		this.content = text;
		this.current = text;
	}
	
	/**
	 * Create a new HTMLText from a user generated input to avoid XSS
	 */
	public static HTMLOutput fromUnsafeInput( String input ) {
		HTMLOutput message = new HTMLOutput( input );
		message.accept( new EntitiesProcessor.Converter() );
		return message;
	}
	
	@Override
	public String getCurrent() {
		return current;
	}
	
	@Override
	public String getContent() {
		return content;
	}
	
	@Override
	public void accept( ProcessorVisitor processor ) {
		processors.add( processor );
	}
	
	@Override
	public String toString() {
		this.current = getContent();
		Iterator<ProcessorVisitor> iterator = processors.iterator();
		while ( iterator.hasNext() ) {
			ProcessorVisitor processor = iterator.next();
			this.current = processor.process( this );
		}
		return this.current;
	}
}
