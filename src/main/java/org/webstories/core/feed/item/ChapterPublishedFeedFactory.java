package org.webstories.core.feed.item;

import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.activity.ChapterPublishedActivity;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;

public class ChapterPublishedFeedFactory extends FeedFactory {
	private ChapterPublishedActivity activity;
	
	public ChapterPublishedFeedFactory( ChapterPublishedActivity activity ) {
		super( activity );
		this.activity = activity;
	}
	
	@Override
	protected ChapterPublishedContent createContent() {
		ChapterPublishedContent result = new ChapterPublishedContent();
		ChapterEntity chapter = activity.getChapter();
		StoryEntity story = chapter.getStory();
		MetaEntity storyMeta = chapter.getStory().getMeta();
		
		long storyId = story.getId();
		int chapterPosition = chapter.getPosition();
		HTMLText storyTitle = HTMLText.fromUnsafeInput( storyMeta.getTitle() );
		HTMLText chapterTitle = HTMLText.fromUnsafeInput( chapter.getTitle() );
		
		result.setStoryId( storyId );
		result.setChapterPosition( chapterPosition );
		result.setStoryTitle( storyTitle );
		result.setChapterTitle( chapterTitle );
		
		return result;
	}
	
	@Override
	protected String createDate() {
		return "not available";
	}
	
	@Override
	protected FeedType createType() {
		return FeedType.CHAPTER_PUBLISHED;
	}
}
