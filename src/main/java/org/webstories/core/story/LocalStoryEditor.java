package org.webstories.core.story;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.impl.EditorStoryDetailsInput;
import org.webstories.core.story.impl.EditorStoryInput;
import org.webstories.core.validation.ValidationException;

@Local
public interface LocalStoryEditor {
	void updateMeta( long idStory, EditorStoryDetailsInput input ) throws ValidationException;
	void updateStory( EditorStoryInput story, Logged logged )
		throws ValidationException, AccessDeniedException;
}
