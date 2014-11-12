package org.webstories.core.validation;

public class ValidationException extends Exception {
	private static final long serialVersionUID = 1;
	public ValidationException() {
		super();
	}
	public ValidationException( String msg ) {
		super( msg );
	}
}
