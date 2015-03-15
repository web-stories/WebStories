package org.webstories.web.convention.pages.error;

import org.webstories.web.api.exception.ErrorObject;
import org.webstories.web.api.exception.ErrorObjectFactory;


public class LogonErrors {
	/**
	 * Translate several types of logon errors into a specific instance of an error object
	 */
	public static ErrorObject translate( Throwable e ) {
		ErrorObjectFactory factory = new ErrorObjectFactory( e );
		ErrorObject error = new ErrorObject( factory );
		
		return error;
	}
}
