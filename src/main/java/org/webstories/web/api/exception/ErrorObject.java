package org.webstories.web.api.exception;

public class ErrorObject {
	private String message;
	
	public ErrorObject( ErrorObjectFactory factory ) {
		this.message = factory.createMessage();
	}
	
	// Prevent weird exception regarding yaml when accessing a REST service that doesn't have
	// any method set for that path
	public void setMessage( String message ) {
		this.message = message;
	}
	public String getMessage() {
		return message;
	}
}
