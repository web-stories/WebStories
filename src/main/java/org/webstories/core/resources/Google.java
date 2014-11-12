package org.webstories.core.resources;

import java.util.Properties;

public class Google {
	private GoogleAnalytics analytics;
	private Google( GoogleAnalytics analytics ) {
		this.analytics = analytics;
	}
	public static Google from( Properties properties ) {
		GoogleAnalytics app = GoogleAnalytics.from( properties );
		return new Google( app );
	}
	public GoogleAnalytics getAnalytics() {
		return analytics;
	}
}
