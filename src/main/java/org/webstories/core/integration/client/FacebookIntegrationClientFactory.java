package org.webstories.core.integration.client;

import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.ServletRequest;

import com.restfb.FacebookClient;

public class FacebookIntegrationClientFactory implements IntegrationClientFactory {
	private FacebookClient client;
	private ServletRequest request;
	private String next = "http://webstories.org/";
	public FacebookIntegrationClientFactory( FacebookClient client, ServletRequest request ) {
		this.client = client;
		this.request = request;
	}
	public FacebookIntegrationClientFactory(
		FacebookClient client,
		ServletRequest request,
		String next
	) {
		this( client, request );
		this.next = next;
	}
	@Override
	public String createLogoutUrl() throws MalformedURLException {
		URL old = new URL( next );
		URL result = new URL( old.getProtocol(), resolveAppHost(), old.getFile() );
		return client.getLogoutUrl( result.toString() );
	}
	private String resolveAppHost() {
		String appHost = "webstories.org";
		
		// Facebook authentication doesn't work for IP addresses
		if ( "127.0.0.1".equals( request.getRemoteAddr() ) ) {
			return "localhost";
		}
		
		return appHost;
	}
}
