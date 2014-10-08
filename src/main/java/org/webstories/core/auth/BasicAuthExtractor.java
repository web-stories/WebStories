package org.webstories.core.auth;

import org.webstories.core.utils.Base64;

public class BasicAuthExtractor implements AuthExtractor {
	private String username;
	private String password;
	public static BasicAuthExtractor from( String header ) {
		String encoded = header.replaceFirst( "Basic ", "" );
		String decoded = Base64.decode( encoded );
		String[] data = decoded.split( ":" );
		
		BasicAuthExtractor extractor = new BasicAuthExtractor();
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
