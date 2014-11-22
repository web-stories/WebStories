package org.webstories.core.user.avatar;

import java.net.MalformedURLException;


public class FacebookAvatarURL extends AvatarURL {
	public FacebookAvatarURL( String url ) throws MalformedURLException {
		super( url );
	}
	
	@Override
	public void setWidth( int width ) {
		// TODO implement width manipulation
	}
	@Override
	public void setHeight( int height ) {
		// TODO implement height manipulation
	}
	
	@Override
	public String toString() {
		// TODO create stringified URL
		return "";
	}
}
