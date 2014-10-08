package org.webstories.core.auth.http;

import org.webstories.core.utils.Base64;

public class BasicAuthData implements HttpAuthData {
	private String username;
	private String password;
	public static BasicAuthData from( String authorization ) {
		String encoded = authorization.replaceFirst( "Basic ", "" );
		String decoded = Base64.decode( encoded );
		String[] data = decoded.split( ":" );
		
		BasicAuthData extractor = new BasicAuthData();
		extractor.username = data[ 0 ];
		extractor.password = data[ 1 ];
		
		return extractor;
	}
	@Override
	public String getUsername() {
		return username;
	}
	@Override
	public String getPassword() {
		return password;
	}
}
