package org.webstories.core.resources;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

public class ApplicationProperties {
	private Facebook facebook;
	private Google google;
	private ApplicationProperties( Facebook facebook, Google google ) {
		this.facebook = facebook;
		this.google = google;
	}
	public static ApplicationProperties from( Properties properties ) {
		Facebook facebook = Facebook.from( properties );
		Google google = Google.from( properties );
		return new ApplicationProperties( facebook, google );
	}
	public static ApplicationProperties from( HttpServletRequest request ) {
		return ( ApplicationProperties )request.getAttribute( "application" );
	}
	public Facebook getFacebook() {
		return facebook;
	}
	public Google getGoogle() {
		return google;
	}
}
