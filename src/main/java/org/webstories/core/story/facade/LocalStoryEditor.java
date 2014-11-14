package org.webstories.core.story.facade;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.editor.EditorStoryDetailsInput;
import org.webstories.core.story.editor.EditorStoryInput;
import org.webstories.core.validation.ValidationException;

@Local
public interface LocalStoryEditor {
	void updateMeta( long idStory, EditorStoryDetailsInput input, Logged logged )
		throws ValidationException, AccessDeniedException;
	void updateStory( EditorStoryInput story, Logged logged )
		throws ValidationException, AccessDeniedException, UserNotLoggedException;
	void removeStory( long idStory, Logged logged )
		throws ValidationException, AccessDeniedException, UserNotLoggedException;
	void publishChapter( long idChapter, Logged logged )
		throws ValidationException, AccessDeniedException, UserNotLoggedException;
}