package org.webstories.core.integration.client;

import javax.servlet.ServletRequest;

import com.restfb.FacebookClient;

public class FacebookIntegrationClientFactory implements IntegrationClientFactory {
	private FacebookClient client;
	private ServletRequest request;
	public FacebookIntegrationClientFactory( FacebookClient client, ServletRequest request ) {
		this.client = client;
		this.request = request;
	}
	@Override
	public String createLogoutUrl() {
		String redirectHost = "webstories.org";
		// Facebook authentication doesn't work for IP addresses
		if ( "127.0.0.1".equals( request.getRemoteAddr() ) ) {
			redirectHost = "localhost";
		}
		return client.getLogoutUrl( "http://" + redirectHost + "/" );
	}
}
