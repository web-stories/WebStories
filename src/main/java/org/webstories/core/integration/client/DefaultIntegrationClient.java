package org.webstories.core.integration.client;

import java.io.Serializable;

@SuppressWarnings( "serial" )
public class DefaultIntegrationClient implements IntegrationClient, Serializable {
	private String logoutUrl;
	public DefaultIntegrationClient( IntegrationClientFactory factory ) {
		this.logoutUrl = factory.createLogoutUrl();
	}
	@Override
	public String getLogoutURL() {
		return logoutUrl;
	}
}
