package org.webstories.core.auth.http;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;

@Local
public interface LocalHttpAuthentication {
	Logged basic( BasicAuthData data );
}
