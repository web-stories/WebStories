package org.webstories.core.feed.item;

import org.webstories.dao.activity.JoinedActivityEntity;

public class JoinedFeedFactory extends FeedFactory {
	public JoinedFeedFactory( JoinedActivityEntity activity ) {
		super( activity );
	}
	
	@Override
	protected JoinedContent createContent() {
		return new JoinedContent( "Entrou no Web Stories" );
	}
	
	@Override
	protected FeedType createType() {
		return FeedType.JOINED;
	}
}
