package org.webstories.core.text.html;

import java.util.Iterator;
import java.util.TreeSet;

public class Message implements ProcessorVisitable {
	private String original;
	private String current;
	private TreeSet<ProcessorVisitor> processors = new TreeSet<ProcessorVisitor>();
	private Message( String text ) {
		this.original = this.current = text;
	}
	public static Message fromPlainText( String text ) {
		return new Message( text );
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
		this.current = original;
		Iterator<ProcessorVisitor> iterator = processors.iterator();
		while ( iterator.hasNext() ) {
			ProcessorVisitor processor = iterator.next();
			this.current = processor.process( this );
		}
		return this.current;
	}
}
