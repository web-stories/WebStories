package org.webstories.core.feed;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.feed.item.FeedItem;
import org.webstories.core.logging.LocalAppLogger;
import org.webstories.dao.activity.ActivityEntity;
import org.webstories.dao.activity.ActivityQueries;

@Stateless
public class NewsFeed implements LocalNewsFeed {
	@EJB
	ActivityQueries activityQueries;
	
	@EJB
	LocalAppLogger logger;
	
	@Override
	public List<FeedItem> feedItems( Logged logged )
	throws UserNotLoggedException, AccessDeniedException {
		List<FeedItem> result = new ArrayList<FeedItem>();
		List<ActivityEntity> newsActivities = activityQueries.listNewsFeedActivities();
		
		for ( ActivityEntity activity : newsActivities ) {
			try {
				FeedItem item = NewsFeedUtils.createItem( activity );
				result.add( item );
			} catch ( FeedFactoryNotImplementedException e ) {
				logger.logInternal( e );
			}
		}
		
		return result;
	}
}
