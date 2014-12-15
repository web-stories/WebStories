package org.webstories.core.text.manipulable;


public interface ProcessorVisitable {
	void accept( ProcessorVisitor processor );
}
