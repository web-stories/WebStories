package org.webstories.core.auth.http;

import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;

@Stateless
public class HttpAuthentication implements LocalHttpAuthentication {
	@Override
	public Logged basic( BasicAuthData data ) {
		// TODO Create initial password for facebook login
		return null;
	}
}