package org.webstories.core.auth.http;

import javax.ejb.Local;

import org.webstories.core.auth.AuthenticationException;
import org.webstories.core.auth.Logged;

@Local
public interface LocalHttpAuthentication {
	Logged authenticate( HttpAuthData data ) throws AuthenticationException;
}
