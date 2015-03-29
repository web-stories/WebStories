package org.webstories.core.auth;


public class FacebookEmailMatchingException extends FacebookAuthenticationException {
	private static final long serialVersionUID = 1;
	private String inviteEmail;
	private String userEmail;
	private String facebookLogoutURL;
	public FacebookEmailMatchingException(
		String inviteEmail,
		String userEmail,
		String facebookLogoutURL
	) {
		super( "Este convite já foi utilizado" );
		this.inviteEmail = inviteEmail;
		this.userEmail = userEmail;
		this.facebookLogoutURL = facebookLogoutURL;
	}
	public FacebookEmailMatchingException( Throwable cause ) {
		super( cause );
	}
	public String getInviteEmail() {
		return inviteEmail;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public String getFacebookLogoutURL() {
		return facebookLogoutURL;
	}
}
