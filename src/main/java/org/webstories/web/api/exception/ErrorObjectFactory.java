package org.webstories.web.api.exception;

public class ErrorObjectFactory {
	public static ErrorObject create( Throwable e ) {
		Throwable currentCause = e;
		String message = e.getMessage();
		
		// Iterate over all causes to find the closest message to the root cause
		while ( currentCause.getCause() != null ) {
			currentCause = currentCause.getCause();
			if ( currentCause.getMessage() != null ) {
				message = currentCause.getMessage();
			}
		}
		
		// No message was found...
		if ( message == null ) {
			message = "Unknown error";
		}
		
		return new ErrorObject( message );
	}
}
