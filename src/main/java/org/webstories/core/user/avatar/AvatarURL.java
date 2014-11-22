package org.webstories.core.user.avatar;

public abstract class AvatarURL {
	protected String url;
	
	public abstract void setWidth( int width );
	public abstract void setHeight( int height );
	
	@Override
	public abstract String toString();
}
