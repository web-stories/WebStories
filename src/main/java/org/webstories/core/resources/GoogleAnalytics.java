package org.webstories.core.resources;

import java.util.Properties;

public class GoogleAnalytics {
	private String id;
	private GoogleAnalytics( String id ) {
		this.id = id;
	}
	public static GoogleAnalytics from( Properties properties ) {
		String id = properties.getProperty( "google.analytics.id" );
		return new GoogleAnalytics( id );
	}
	public String getId() {
		return id;
	}
}
