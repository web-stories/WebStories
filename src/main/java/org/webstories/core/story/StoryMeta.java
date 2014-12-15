package org.webstories.core.story;

import org.webstories.core.text.TextDecorator;

public interface StoryMeta {
	TextDecorator getTitle();
	TextDecorator getSummary();
	TextDecorator getSynopsis();
}
