package org.webstories.core.feed;

import org.webstories.core.feed.item.ChapterPublishedFeedFactory;
import org.webstories.core.feed.item.DefaultFeedItem;
import org.webstories.core.feed.item.FeedFactory;
import org.webstories.core.feed.item.FeedItem;
import org.webstories.core.feed.item.JoinedFeedFactory;
import org.webstories.core.feed.item.NewStoryFeedFactory;
import org.webstories.dao.activity.ActivityEntity;
import org.webstories.dao.activity.ChapterPublishedActivity;
import org.webstories.dao.activity.JoinedActivityEntity;
import org.webstories.dao.activity.NewStoryActivityEntity;

public class NewsFeedUtils {
	public static FeedItem createItem( ActivityEntity activity )
	throws FeedFactoryNotImplementedException {
		FeedFactory factory = null;
		
		if ( activity instanceof JoinedActivityEntity ) {
			factory = new JoinedFeedFactory( ( JoinedActivityEntity )activity );
		} else if ( activity instanceof ChapterPublishedActivity ) {
			factory = new ChapterPublishedFeedFactory( ( ChapterPublishedActivity )activity );
		} else if ( activity instanceof NewStoryActivityEntity ) {
			factory = new NewStoryFeedFactory( ( NewStoryActivityEntity )activity );
		}
		
		if ( factory == null ) {
			throw new FeedFactoryNotImplementedException( activity );
		}
		
		return new DefaultFeedItem( factory );
	}
}
