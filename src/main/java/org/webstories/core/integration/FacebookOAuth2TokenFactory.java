package org.webstories.core.integration;

import javax.servlet.http.HttpServletRequest;

import org.webstories.core.resources.ApplicationProperties;

public class FacebookOAuth2TokenFactory extends OAuth2TokenFactory {
	private HttpServletRequest request;
	public FacebookOAuth2TokenFactory( HttpServletRequest request ) {
		this.request = request;
	}
	@Override
	protected String createAPIAddress() {
		return "https://graph.facebook.com/oauth/access_token";
	}
	@Override
	protected OAuth2AppConfigs createAppConfigs() {
		return ApplicationProperties.from( request ).getFacebook().getApp();
	}
	@Override
	protected String createCode() {
		return request.getParameter( "code" );
	}
	@Override
	protected String createRedirectURI() {
		return getBaseURL() + "/identification/logon";
	}
	@Override
	protected String extractTokenFromResponse( String responseBody ) throws OAuth2TokenException {
		if ( !responseBody.startsWith( "access_token=" ) ) {
			throw new OAuth2TokenException( "Invalid body format: " + responseBody );
		}
		return responseBody.split( "&" )[ 0 ].split( "=" )[ 1 ];
	}
	private String getBaseURL() {
		String requestURL = request.getRequestURL().toString();
		String requestURI = request.getRequestURI();
		String contextPath = request.getContextPath();
		return requestURL.replace( requestURI, contextPath );
	}
}
