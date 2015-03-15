package org.webstories.web.convention.pages.error.logon;

import org.webstories.web.api.exception.ErrorObject;

public class LogonErrorObject extends ErrorObject {
	private LogonErrorType type;
	public LogonErrorObject( LogonErrorObjectFactory factory ) {
		super( factory );
		this.type = factory.createType();
	}
	public LogonErrorType getType() {
		return type;
	}
}
