package org.webstories.core.story.viewer;

public interface SlideFactory {
	int createChapter();
	int createSection();
	SlideType createType();
}
