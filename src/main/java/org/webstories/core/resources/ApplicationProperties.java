package org.webstories.core.resources;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

public class ApplicationProperties {
	private Facebook facebook;
	private ApplicationProperties( Facebook facebook ) {
		this.facebook = facebook;
	}
	public static ApplicationProperties from( Properties properties ) {
		Facebook facebook = Facebook.from( properties );
		return new ApplicationProperties( facebook );
	}
	public static ApplicationProperties from( HttpServletRequest request ) {
		return ( ApplicationProperties )request.getAttribute( "application" );
	}
	public Facebook getFacebook() {
		return facebook;
	}
}
