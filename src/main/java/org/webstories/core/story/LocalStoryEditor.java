package org.webstories.core.story;

import javax.ejb.Local;

import org.webstories.core.story.impl.EditorStoryDetailsInput;
import org.webstories.core.validation.ValidationException;

@Local
public interface LocalStoryEditor {
	void updateMeta( long idStory, EditorStoryDetailsInput input ) throws ValidationException;
}
