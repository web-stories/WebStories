package org.webstories.core.feed.item;

import org.webstories.core.text.html.HTMLText;

public class ChapterPublishedContent extends FeedContent {
	private Long storyId;
	private int chapterPosition;
	private HTMLText storyTitle;
	private HTMLText chapterTitle;
	
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
	
	public HTMLText getStoryTitle() {
		return storyTitle;
	}
	public void setStoryTitle( HTMLText storyTitle ) {
		this.storyTitle = storyTitle;
	}
	
	public HTMLText getChapterTitle() {
		return chapterTitle;
	}
	public void setChapterTitle( HTMLText chapterTitle ) {
		this.chapterTitle = chapterTitle;
	}
}
