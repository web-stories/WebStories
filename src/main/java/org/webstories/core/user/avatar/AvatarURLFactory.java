package org.webstories.core.user.avatar;

import org.eclipse.jdt.annotation.NonNull;
import org.webstories.core.user.AccountProvider;
import org.webstories.dao.IdentifiableEntity;

public abstract class AvatarURLFactory {
	public static @NonNull AvatarURL createFrom( IdentifiableEntity identifiable ) {
		AvatarURL url = null;
		String avatarURL = identifiable.getAvatarURL();
		AccountProvider provider = identifiable.getAccountProvider();
		
		switch ( provider ) {
			case FACEBOOK:
				url = new FacebookAvatarURL( avatarURL );
			break;
		}
		
		if ( url == null ) {
			throw new RuntimeException( "avatar url is not implemented for provider: " + provider );
		}
		
		return url;
	}
}
