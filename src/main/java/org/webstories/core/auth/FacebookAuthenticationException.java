package org.webstories.core.auth;

public class FacebookAuthenticationException extends AuthenticationException {
	private static final long serialVersionUID = 1;
	public FacebookAuthenticationException( String msg ) {
		super( msg );
	}
	public FacebookAuthenticationException( Throwable cause ) {
		super( cause );
	}
}
