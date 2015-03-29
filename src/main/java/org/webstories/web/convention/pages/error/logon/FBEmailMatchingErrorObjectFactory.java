package org.webstories.web.convention.pages.error.logon;

import org.webstories.core.auth.FacebookEmailMatchingException;


public class FBEmailMatchingErrorObjectFactory extends LogonErrorObjectFactory {
	private FacebookEmailMatchingException exception;
	public FBEmailMatchingErrorObjectFactory( FacebookEmailMatchingException exception ) {
		super( exception );
		this.exception = exception;
	}
	@Override
	public LogonErrorType createType() {
		return LogonErrorType.FB_EMAIL_MATCHING;
	}
	public String createInviteEmail() {
		return exception.getInviteEmail();
	}
	public String createUserEmail() {
		return exception.getUserEmail();
	}
	public String createFacebookLogoutURL() {
		return exception.getFacebookLogoutURL();
	}
}
