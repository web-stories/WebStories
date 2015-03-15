package org.webstories.web.api.exception;

import org.webstories.core.throwables.ThrowableUtils;

public class ErrorObjectFactory {
	private Throwable e;
	
	public ErrorObjectFactory( Throwable e ) {
		this.e = e;
	}
	
	public String createMessage() {
		Throwable rootCauseWithMessage = ThrowableUtils.findRootCauseWithMessage( e );
		String message = rootCauseWithMessage.getMessage();
		
		// If there's no message in the whole stack...
		if ( message == null ) {
			message = "Unknown error";
		}
		
		return message;
	}
}
