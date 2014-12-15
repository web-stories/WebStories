package org.webstories.core.text.html;

import java.util.Iterator;
import java.util.TreeSet;

import org.webstories.core.text.Text;

public class HTMLText extends Text implements ProcessorVisitable {
	private String current;
	private TreeSet<ProcessorVisitor> processors = new TreeSet<ProcessorVisitor>();
	private HTMLText( String text ) {
		super( text );
		this.current = text;
	}
	/**
	 * Create a new HTMLText and escape the html entities from an unsafe input
	 */
	public static HTMLText fromUnsafeInput( String input ) {
		HTMLText message = new HTMLText( input );
		message.accept( new EntitiesProcessor.Converter() );
		return message;
	}
	/**
	 * Create a new HTMLText without additional html escaping. Should be used when the input is not
	 * a user generated input.
	 */
	public static HTMLText fromSafeInput( String input ) {
		return new HTMLText( input );
	}
	protected String getCurrent() {
		return current;
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
