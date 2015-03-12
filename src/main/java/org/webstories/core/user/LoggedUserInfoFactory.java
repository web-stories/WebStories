package org.webstories.core.user;

import java.net.MalformedURLException;

import org.webstories.core.user.avatar.AvatarURL;
import org.webstories.core.user.avatar.AvatarURLFactory;
import org.webstories.dao.IdentifiableEntity;

public class LoggedUserInfoFactory extends IdentifiableUserInfoFactory {
	public LoggedUserInfoFactory( IdentifiableEntity identifiable ) {
		super( identifiable );
	}
	
	@Override
	public AvatarURL createAvatarURL() {
		try {
			AvatarURL url = AvatarURLFactory.createFrom( identifiable );
			url.setWidth( 30 );
			url.setHeight( 30 );
			return url;
		} catch ( MalformedURLException e ) {
			throw new RuntimeException( "Failed to create avatar url", e );
		}
	}
}
