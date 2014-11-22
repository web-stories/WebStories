package org.webstories.core.user.avatar;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Pattern;


public class FacebookAvatarURL extends AvatarURL {
	public FacebookAvatarURL( String url ) throws MalformedURLException {
		super( url );
	}
	
	@Override
	public void setWidth( int width ) {
		setQuery( "width", width );
	}
	@Override
	public void setHeight( int height ) {
		setQuery( "height", height );
	}
	
	@Override
	public String toString() {
		return url.toString();
	}
	
	// In the future the system may have multiple providers with multiple URL patterns, not just
	// Facebook, in that case it may be reasonable to manipulate the url using a standalone
	// class instead of how it is being done now, to account for complex manipulation.
	// The best approach here would be to create some kind of URLDecorator that internally uses
	// java.net.URL for common methods/validation, receives a String and provides accessor
	// methods such as setQuery( String key, Object value ) and toString().
	
	/**
	 * Set a value to an existing query parameter or create another one if it doesn't exist.
	 */
	private void setQuery( String key, Object value ) {
		String contentQuery = "";
		String contentURI = "";
		String content = url.toString();
		
		try {
			contentURI = content.split( Pattern.quote( "?" ) )[ 0 ];
			contentQuery = content.split( Pattern.quote( "?" ) )[ 1 ];
		} catch ( ArrayIndexOutOfBoundsException e ) {}
		
		try {
			String[] pairs = contentQuery.split( Pattern.quote( "&" ) );
			for ( int i = 0; i < pairs.length; i++ ) {
				String pair = pairs[ i ];
				String[] item = pair.split( "=" );
				String itemKey = item[ 0 ];
				
				if ( itemKey.equals( key ) ) {
					contentQuery = contentQuery.replace( pair, itemKey + "=" + value );
					this.url = new URL(
						contentQuery.isEmpty() ?
							contentURI : contentURI + "?" + contentQuery
					);
					return;
				}
			}
			
			if ( !contentQuery.isEmpty() ) {
				contentQuery += "&";
			}
			contentQuery += key + "=" + value;
			
			this.url = new URL( contentURI + "?" + contentQuery );
		} catch ( MalformedURLException e ) {
			throw new RuntimeException( e );
		}
	}
}
