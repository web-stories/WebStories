package org.webstories.core.integration;

@SuppressWarnings( "serial" )
public class OAuth2TokenException extends Exception {
	public OAuth2TokenException( String msg ) {
		super( msg );
	}
	public OAuth2TokenException( Throwable cause ) {
		super( cause );
	}
}
