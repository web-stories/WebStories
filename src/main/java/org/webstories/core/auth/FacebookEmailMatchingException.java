package org.webstories.core.auth;

@SuppressWarnings( "serial" )
public class FacebookEmailMatchingException extends FacebookAuthenticationException {
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
