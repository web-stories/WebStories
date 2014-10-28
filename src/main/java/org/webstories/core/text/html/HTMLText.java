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
	 * Create a new HTMLText while escaping the html entities by default
	 */
	public static HTMLText fromPlainText( String text ) {
		HTMLText message = new HTMLText( text );
		message.accept( new EntitiesProcessor.Converter() );
		return message;
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
