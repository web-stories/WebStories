package org.webstories.core.story;

import javax.ejb.Local;

@Local
public interface LocalStoryEditor {
	void updateMeta( long idStory, StoryMetaInput input );
}
