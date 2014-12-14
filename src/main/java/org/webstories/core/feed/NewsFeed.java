package org.webstories.core.feed;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.dao.activity.ActivityEntity;
import org.webstories.dao.activity.ActivityQueries;

@Stateless
public class NewsFeed implements LocalNewsFeed {
	@EJB
	ActivityQueries activityQueries;
	
	@Override
	public List<FeedItem> newsFeed( Logged logged )
	throws UserNotLoggedException, AccessDeniedException {
		List<FeedItem> result = new ArrayList<FeedItem>();
		List<ActivityEntity> newsActivities = activityQueries.listNewsFeedActivities();
		
		for ( ActivityEntity activity : newsActivities ) {
			// TODO
		}
		
		return result;
	}
}
