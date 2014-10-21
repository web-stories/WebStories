package org.webstories.web.api.exception;

public class ErrorObjectFactory {
	public static ErrorObject create( Throwable e ) {
		String message = e.getMessage();
		if ( message == null ) {
			message = "Unknown error";
		}
		return new ErrorObject( message );
	}
}
