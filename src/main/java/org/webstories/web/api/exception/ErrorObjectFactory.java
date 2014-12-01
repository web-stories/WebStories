package org.webstories.web.api.exception;

public class ErrorObjectFactory {
	public static ErrorObject create( Throwable e ) {
		Throwable root = e;
		
		while ( root.getCause() != null ) {
			root = root.getCause();
		}
		
		String message = root.getMessage();
		
		if ( message == null ) {
			message = "Unknown error";
		}
		
		return new ErrorObject( message );
	}
}
