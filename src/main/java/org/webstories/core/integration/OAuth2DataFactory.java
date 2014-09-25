package org.webstories.core.integration;

public abstract class OAuth2DataFactory {
	public OAuth2Data createData() {
		final String inviteCode = retrieveInviteCode();
		final String redirect = retrieveRedirect();
		return new OAuth2Data() {
			@Override
			public String getInviteCode() {
				return inviteCode;
			}
			@Override
			public String getRedirect() {
				return redirect;
			}
		};
	}
	/**
	 * Retrieves the invite code data from an OAuth2 authorization process
	 * @return  The invite code or <code>null</code> if the invite code is empty
	 */
	protected abstract String retrieveInviteCode();
	/**
	 * Retrieve the URI to be redirected inside the application after a successful login
	 */
	protected abstract String retrieveRedirect();
}
