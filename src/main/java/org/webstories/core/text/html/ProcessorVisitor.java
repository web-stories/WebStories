package org.webstories.core.text.html;

public interface ProcessorVisitor extends Comparable<ProcessorVisitor> {
	String process( Message message );
	ProcessorAlias getAlias();
}
