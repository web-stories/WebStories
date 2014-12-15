package org.webstories.core.feed;

import java.nio.file.AccessDeniedException;
import java.util.List;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.feed.item.FeedItem;

@Local
public interface LocalNewsFeed {
	List<FeedItem> feedItems( Logged logged ) throws UserNotLoggedException, AccessDeniedException;
}
