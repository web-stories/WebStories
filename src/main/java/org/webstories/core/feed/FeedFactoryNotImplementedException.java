package org.webstories.core.feed;

import org.webstories.dao.activity.ActivityEntity;

@SuppressWarnings( "serial" )
public class FeedFactoryNotImplementedException extends Exception {
	public FeedFactoryNotImplementedException( ActivityEntity activity ) {
		super( "Factory not implemented for activity: " + activity.getId() );
	}
}
