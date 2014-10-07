package org.webstories.core.story;

import javax.ejb.Local;

import org.webstories.core.story.impl.StoryMetaInput;
import org.webstories.core.validation.ValidationException;

@Local
public interface LocalStoryEditor {
	void updateMeta( long idStory, StoryMetaInput input ) throws ValidationException;
}
