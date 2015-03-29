package org.webstories.core.integration.client;

import java.io.Serializable;
import java.net.MalformedURLException;

@SuppressWarnings( "serial" )
public class DefaultIntegrationClient implements IntegrationClient, Serializable {
	private String logoutUrl;
	public DefaultIntegrationClient( IntegrationClientFactory factory )
	throws IntegrationClientException {
		try {
			this.logoutUrl = factory.createLogoutUrl();
		} catch ( MalformedURLException e ) {
			throw new IntegrationClientException( e );
		}
	}
	@Override
	public String getLogoutURL() {
		return logoutUrl;
	}
}
