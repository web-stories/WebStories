package org.webstories.core.validation;

public abstract class ValidationObject {
	private String message;
	
	public ValidationObject( String message ) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
	
	/**
	 * Additional data from validated field
	 */
	public abstract Object getData();
	
	@Override
	public String toString() {
		return getMessage();
	}
}
