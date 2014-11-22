package org.webstories.core.auth;

import javax.ejb.Local;

import org.webstories.core.user.PersonName;

@Local
public interface LocalDefaultAuthentication {
	/**
	 * Registers a new user with the given name, generating a random password
	 */
	long register( PersonName name ) throws AuthenticationException;
}
