package org.webstories.core.auth;

@SuppressWarnings( "serial" )
public class FacebookAuthenticationException extends AuthenticationException {
	public FacebookAuthenticationException( String msg ) {
		super( msg );
	}
	public FacebookAuthenticationException( Throwable cause ) {
		super( cause );
	}
}
