package org.webstories.core.auth;

public class AuthenticationException extends Exception {
	private static final long serialVersionUID = 1;
	public AuthenticationException() {
		super();
	}
	public AuthenticationException( Throwable cause ) {
		super( cause );
	}
	public AuthenticationException( String msg ) {
		super( msg );
	}
}
