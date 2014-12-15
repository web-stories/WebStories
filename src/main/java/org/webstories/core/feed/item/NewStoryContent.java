package org.webstories.core.feed.item;

import org.webstories.core.text.html.HTMLOutput;

public class NewStoryContent extends FeedContent {
	private HTMLOutput storyTitle;
	private HTMLOutput storySummary;
	
	public HTMLOutput getStoryTitle() {
		return storyTitle;
	}
	public void setStoryTitle( HTMLOutput storyTitle ) {
		this.storyTitle = storyTitle;
	}
	
	public HTMLOutput getStorySummary() {
		return storySummary;
	}
	public void setStorySummary( HTMLOutput storySummary ) {
		this.storySummary = storySummary;
	}
}
