package org.webstories.core.text.manipulable;

import org.webstories.core.text.html.HTMLOutput;

public interface ProcessorVisitor extends Comparable<ProcessorVisitor> {
	String process( HTMLOutput message );
	ProcessorAlias getAlias();
}
