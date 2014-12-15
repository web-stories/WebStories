package org.webstories.core.feed.item;

import org.webstories.core.date.RelativeDate;
import org.webstories.core.feed.NewsFeedUserInfoFactory;
import org.webstories.core.user.UserInfo;
import org.webstories.dao.activity.ActivityEntity;
import org.webstories.dao.integration.FacebookEntity;

public abstract class FeedFactory {
	private ActivityEntity activity;
	
	public FeedFactory( ActivityEntity activity ) {
		this.activity = activity;
	}
	
	protected UserInfo createAuthor() {
		FacebookEntity facebook = activity.getUser().getFacebook();
		NewsFeedUserInfoFactory factory = new NewsFeedUserInfoFactory( facebook );
		return new UserInfo( factory );
	}
	
	protected String createDate() {
		return new RelativeDate()
			.from( activity.getDateInc() )
			.until( System.currentTimeMillis() )
			.toRelativeString();
	}
	
	protected abstract FeedContent createContent();
	protected abstract FeedType createType();
}
