package org.webstories.core.validation;

@SuppressWarnings( "serial" )
public class ValidationException extends Exception {
	public ValidationException() {
		super();
	}
	public ValidationException( String msg ) {
		super( msg );
	}
}
