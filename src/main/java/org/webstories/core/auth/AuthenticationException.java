package org.webstories.core.auth;

@SuppressWarnings( "serial" )
public class AuthenticationException extends Exception {
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
