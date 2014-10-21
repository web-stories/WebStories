package org.webstories.core.auth;

import javax.ejb.Local;

@Local
public interface LocalDefaultAuthentication {
	/**
	 * Registers a new user with the given name, generating a random password
	 */
	long register( PersonName name ) throws AuthenticationException;
}
