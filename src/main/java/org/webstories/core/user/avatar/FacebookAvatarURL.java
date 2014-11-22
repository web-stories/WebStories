package org.webstories.core.user.avatar;


public class FacebookAvatarURL extends AvatarURL {
	private String url;
	
	public FacebookAvatarURL( String url ) {
		this.url = url;
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
