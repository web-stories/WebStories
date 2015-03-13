package org.webstories.core.invitation;

import java.net.MalformedURLException;

import org.webstories.core.user.IdentifiableUserInfoFactory;
import org.webstories.core.user.avatar.AvatarURL;
import org.webstories.core.user.avatar.AvatarURLFactory;
import org.webstories.dao.IdentifiableEntity;

public class GuestUserInfoFactory extends IdentifiableUserInfoFactory {
	public GuestUserInfoFactory( IdentifiableEntity identifiable ) {
		super( identifiable );
	}
	@Override
	public AvatarURL createAvatarURL() {
		try {
			AvatarURL url = AvatarURLFactory.createFrom( identifiable );
			url.setWidth( 65 );
			url.setHeight( 65 );
			return url;
		} catch ( MalformedURLException e ) {
			throw new RuntimeException( "Failed to create avatar url", e );
		}
	}
}
