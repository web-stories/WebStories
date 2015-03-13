package org.webstories.core.user;

import java.net.MalformedURLException;

import org.webstories.core.user.avatar.AvatarURL;
import org.webstories.core.user.avatar.AvatarURLFactory;
import org.webstories.dao.IdentifiableEntity;

public class ThumbnailUserInfoFactory extends IdentifiableUserInfoFactory {
	public ThumbnailUserInfoFactory( IdentifiableEntity identifiable ) {
		super( identifiable );
	}
	
	@Override
	protected AvatarURL createAvatarURL() {
		try {
			AvatarURL url = AvatarURLFactory.createFrom( identifiable );
			url.setWidth( 60 );
			url.setHeight( 60 );
			return url;
		} catch ( MalformedURLException e ) {
			throw new RuntimeException( "Failed to create avatar url", e );
		}
	}
}
