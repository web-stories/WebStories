package org.webstories.web.api.exception;

public class ErrorObject {
	private String message;
	
	public ErrorObject( String message ) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
}
