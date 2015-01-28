package org.webstories.core.security.story;

import org.webstories.core.security.DefaultSecurity;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.ChapterState;

public class PublishedChapterSecurity extends DefaultSecurity<ChapterEntity> {
	@Override
	public boolean isAccessible( ChapterEntity chapter ) {
		return chapter.getState() == ChapterState.PUBLISHED;
	}
}
