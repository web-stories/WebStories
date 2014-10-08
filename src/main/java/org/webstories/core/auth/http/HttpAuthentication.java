package org.webstories.core.auth.http;

import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;

@Stateless
public class HttpAuthentication implements LocalHttpAuthentication {
	@Override
	public Logged authenticate( HttpAuthData data ) {
		// TODO Implement behavior
		return null;
	}
}
