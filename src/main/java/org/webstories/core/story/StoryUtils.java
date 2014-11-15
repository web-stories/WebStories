package org.webstories.core.story;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.validation.ValidationObject;
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
	
	/**
	 * Check if this chapter is valid for publication
	 */
	public static List<ValidationObject> validateChapter( ChapterEntity chapter ) {
		// TODO
		return new ArrayList<ValidationObject>();
	}
}
