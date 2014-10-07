package org.webstories.core.story;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.impl.EditorStoryDetailsInput;
import org.webstories.core.validation.ValidationException;

@Local
public interface LocalStoryCreator {
	void createMeta( EditorStoryDetailsInput input, Logged logged ) throws ValidationException;
}
