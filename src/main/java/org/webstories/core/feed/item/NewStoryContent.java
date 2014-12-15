package org.webstories.core.feed.item;

import org.webstories.core.text.html.HTMLText;

public class NewStoryContent extends FeedContent {
	private HTMLText storyTitle;
	private HTMLText storySummary;
	
	public HTMLText getStoryTitle() {
		return storyTitle;
	}
	public void setStoryTitle( HTMLText storyTitle ) {
		this.storyTitle = storyTitle;
	}
	
	public HTMLText getStorySummary() {
		return storySummary;
	}
	public void setStorySummary( HTMLText storySummary ) {
		this.storySummary = storySummary;
	}
}
