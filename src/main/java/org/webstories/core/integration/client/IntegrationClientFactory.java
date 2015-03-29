package org.webstories.core.integration.client;

import java.net.MalformedURLException;


public interface IntegrationClientFactory {
	String createLogoutUrl() throws MalformedURLException;
}
