package org.webstories.core.auth;

public class FacebookEmailMatchingException extends FacebookAuthenticationException {
	private static final long serialVersionUID = 1;
	private String inviteEmail;
	private String userEmail;
	public FacebookEmailMatchingException( String inviteEmail, String userEmail ) {
		super( "Este convite já foi utilizado" );
		this.inviteEmail = inviteEmail;
		this.userEmail = userEmail;
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
}
