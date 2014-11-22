package org.webstories.core.user.avatar;

import java.net.MalformedURLException;
import java.net.URL;

public abstract class AvatarURL {
	protected URL url;
	
	public AvatarURL( String url ) throws MalformedURLException {
		this.url = new URL( url );
	}
	
	public abstract void setWidth( int width );
	public abstract void setHeight( int height );
	
	@Override
	public abstract String toString();
}
