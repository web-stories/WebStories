package org.webstories.core.feed;

import org.webstories.dao.activity.ActivityEntity;

public class FeedFactoryNotImplementedException extends Exception {
	private static final long serialVersionUID = 1;
	public FeedFactoryNotImplementedException( ActivityEntity activity ) {
		super( "Factory not implemented for activity: " + activity.getId() );
	}
}
