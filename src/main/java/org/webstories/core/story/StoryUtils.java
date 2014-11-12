package org.webstories.core.story;

import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.StoryEntity;

public class StoryUtils {
	/**
	 * Check if the story can be removed by the person who have rights to remove it, usually its
	 * author.
	 */
	public static boolean isRemovable( StoryEntity story ) {
		if ( story.getChapters().size() > 1 ) {
			return false;
		}
		if ( story.getChapters().size() == 1 ) {
			ChapterEntity chapter = story.getChapters().get( 0 );
			if ( chapter.getSections().size() > 1 ) {
				return false;
			}
		}
		return true;
	}
}
