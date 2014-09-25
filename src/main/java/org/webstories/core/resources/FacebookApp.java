package org.webstories.core.resources;

import java.util.Properties;

import org.webstories.core.integration.OAuth2AppConfigs;

public class FacebookApp implements OAuth2AppConfigs {
	private String id;
	private String secret;
	private FacebookApp( String id, String secret ) {
		this.id = id;
		this.secret = secret;
	}
	public static FacebookApp from( Properties properties ) {
		String id = properties.getProperty( "facebook.app.id" );
		String secret = properties.getProperty( "facebook.app.secret" );
		return new FacebookApp( id, secret );
	}
	@Override
	public String getId() {
		return id;
	}
	@Override
	public String getSecret() {
		return secret;
	}
}
