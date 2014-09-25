package org.webstories.core.integration;

public abstract class OAuth2DataFactory {
	public OAuth2Data createData() {
		final String inviteCode = retrieveInviteCode();
		return new OAuth2Data() {
			@Override
			public String getInviteCode() {
				return inviteCode;
			}
		};
	}
	/**
	 * Retrieves the invite code data from an OAuth2 authorization process
	 */
	protected abstract String retrieveInviteCode();
}
