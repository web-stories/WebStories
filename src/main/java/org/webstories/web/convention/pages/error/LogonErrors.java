package org.webstories.web.convention.pages.error;

import org.webstories.core.auth.FacebookEmailMatchingException;
import org.webstories.web.convention.pages.error.logon.FBEmailMatchingErrorObject;
import org.webstories.web.convention.pages.error.logon.FBEmailMatchingErrorObjectFactory;
import org.webstories.web.convention.pages.error.logon.LogonErrorObject;
import org.webstories.web.convention.pages.error.logon.LogonErrorObjectFactory;


public class LogonErrors {
	/**
	 * Translate several types of logon errors into a specific instance of an error object
	 */
	public static LogonErrorObject translate( Throwable e ) {
		if ( e instanceof FacebookEmailMatchingException ) {
			FacebookEmailMatchingException exception = ( FacebookEmailMatchingException )e;
			FBEmailMatchingErrorObjectFactory factory =
				new FBEmailMatchingErrorObjectFactory( exception );
			return new FBEmailMatchingErrorObject( factory );
		}
		LogonErrorObjectFactory factory = new LogonErrorObjectFactory( e );
		return new LogonErrorObject( factory );
	}
}
