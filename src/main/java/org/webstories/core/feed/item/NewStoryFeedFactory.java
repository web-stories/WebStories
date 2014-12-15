package org.webstories.core.feed.item;

import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.activity.NewStoryActivityEntity;
import org.webstories.dao.story.MetaEntity;

public class NewStoryFeedFactory extends FeedFactory {
	private NewStoryActivityEntity activity;
	
	public NewStoryFeedFactory( NewStoryActivityEntity activity ) {
		super( activity );
		this.activity = activity;
	}
	
	@Override
	protected NewStoryContent createContent() {
		NewStoryContent result = new NewStoryContent();
		MetaEntity storyMeta = activity.getStory().getMeta();
		
		HTMLText storyTitle = HTMLText.fromUnsafeInput( storyMeta.getTitle() );
		HTMLText storySummary = HTMLText.fromUnsafeInput( storyMeta.getSummary() );
		
		result.setStoryTitle( storyTitle );
		result.setStorySummary( storySummary );
		
		return result;
	}
	
	@Override
	protected String createDate() {
		return "not available";
	}
	
	@Override
	protected FeedType createType() {
		return FeedType.NEW_STORY;
	}
}
