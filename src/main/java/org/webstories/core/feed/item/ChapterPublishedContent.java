package org.webstories.core.feed.item;

import org.webstories.core.text.html.HTMLOutput;

public class ChapterPublishedContent extends FeedContent {
	private Long storyId;
	private int chapterPosition;
	private HTMLOutput storyTitle;
	private HTMLOutput chapterTitle;
	
	public Long getStoryId() {
		return storyId;
	}
	public void setStoryId( Long storyId ) {
		this.storyId = storyId;
	}
	
	public int getChapterPosition() {
		return chapterPosition;
	}
	public void setChapterPosition( int chapterPosition ) {
		this.chapterPosition = chapterPosition;
	}
	
	public HTMLOutput getStoryTitle() {
		return storyTitle;
	}
	public void setStoryTitle( HTMLOutput storyTitle ) {
		this.storyTitle = storyTitle;
	}
	
	public HTMLOutput getChapterTitle() {
		return chapterTitle;
	}
	public void setChapterTitle( HTMLOutput chapterTitle ) {
		this.chapterTitle = chapterTitle;
	}
}
