package org.webstories.web.convention.pages.error.logon;

import org.webstories.web.api.exception.ErrorObjectFactory;

public class LogonErrorObjectFactory extends ErrorObjectFactory {
	public LogonErrorObjectFactory( Throwable e ) {
		super( e );
	}
	public LogonErrorType createType() {
		return LogonErrorType.DEFAULT;
	}
}
