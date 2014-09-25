package org.webstories.core.integration;

public class OAuth2TokenException extends Exception {
	private static final long serialVersionUID = 1;
	public OAuth2TokenException( String msg ) {
		super( msg );
	}
	public OAuth2TokenException( Throwable cause ) {
		super( cause );
	}
}
