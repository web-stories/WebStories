package org.webstories.core.integration;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import com.google.common.base.Joiner;

public abstract class OAuth2TokenFactory {
	public OAuth2Token requestToken() throws OAuth2TokenException {
		Map<String, String> params = new HashMap<String, String>();
		params.put( "client_id", createAppConfigs().getId() );
		params.put( "client_secret", createAppConfigs().getSecret() );
		params.put( "code", createCode() );
		params.put( "redirect_uri", createRedirectURI() );
		
		String querystring = Joiner.on( "&" ).withKeyValueSeparator( "=" ).join( params );
		String requestURL = createAPIAddress() + "?" + querystring;
		
		try {
			String responseBody = EntityUtils.toString(
				HttpClientBuilder.create().build()
					.execute( new HttpGet( requestURL ) )
					.getEntity()
			);
			
			final String token = extractTokenFromResponse( responseBody );
			
			return new OAuth2Token() {
				@Override
				public String getAccessToken() {
					return token;
				}
			};
		} catch ( IOException e ) {
			throw new OAuth2TokenException( e );
		}
	}
	/**
	 * Create the API address for the token request without any querystring
	 */
	protected abstract String createAPIAddress();
	/**
	 * Create the app specific configs to be sent for the token request
	 */
	protected abstract OAuth2AppConfigs createAppConfigs();
	/**
	 * Create the code to be sent for the token request
	 */
	protected abstract String createCode();
	/**
	 * Create the original redirect_uri to be sent for the token request
	 */
	protected abstract String createRedirectURI();
	/**
	 * Create implementation specific token extraction due to the fact some implementations, like
	 * Facebook, may have a different response format
	 */
	protected abstract String extractTokenFromResponse( String responseBody )
		throws OAuth2TokenException;
}
