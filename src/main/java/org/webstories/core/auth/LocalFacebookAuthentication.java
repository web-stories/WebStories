package org.webstories.core.auth;

import javax.ejb.Local;

import org.webstories.core.integration.OAuth2Data;
import org.webstories.core.integration.OAuth2Token;

@Local
public interface LocalFacebookAuthentication {
	Logged authenticate( OAuth2Token token, OAuth2Data data ) throws AuthenticationException;
}
