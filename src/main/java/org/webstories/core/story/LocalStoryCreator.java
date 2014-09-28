package org.webstories.core.story;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.validation.ValidationException;

@Local
public interface LocalStoryCreator {
	void createMeta( StoryMetaInput input, Logged logged ) throws ValidationException;
}
