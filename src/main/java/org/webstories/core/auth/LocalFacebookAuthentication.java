package org.webstories.core.auth;

import javax.ejb.Local;
import javax.servlet.ServletRequest;

import org.webstories.core.integration.OAuth2Data;
import org.webstories.core.integration.OAuth2Token;

@Local
public interface LocalFacebookAuthentication {
	/**
	 * This is the default authentication mechanism for Facebook<br>
	 * If the user is already registered using the Facebook account, this method returns the logged
	 * instance.<br>
	 * If the user is not registered through Facebook, this method creates a new Facebook
	 * registration and returns the logged instance.
	 */
	Logged authenticate( OAuth2Token token, OAuth2Data data, ServletRequest request )
		throws FacebookAuthenticationException;
}
