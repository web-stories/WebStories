package org.webstories.core.story.facade;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.editor.EditorStoryDetailsInput;
import org.webstories.core.validation.ValidationException;

@Local
public interface LocalStoryCreator {
	long createMeta( EditorStoryDetailsInput input, Logged logged ) throws ValidationException;
}
