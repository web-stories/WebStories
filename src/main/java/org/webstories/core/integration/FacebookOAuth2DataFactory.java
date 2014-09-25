package org.webstories.core.integration;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.webstories.core.utils.Base64;

public class FacebookOAuth2DataFactory extends OAuth2DataFactory {
	private String data[];
	public FacebookOAuth2DataFactory( HttpServletRequest request ) {
		String state = request.getParameter("state" );
		this.data = Base64.decode( state ).split( Pattern.quote( "||" ) );
	}
	@Override
	protected String retrieveInviteCode() {
		return data[ 0 ];
	}
}
