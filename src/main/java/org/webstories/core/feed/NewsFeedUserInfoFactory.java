package org.webstories.core.feed;

import java.net.MalformedURLException;

import org.webstories.core.user.PersonName;
import org.webstories.core.user.UserInfoFactory;
import org.webstories.core.user.avatar.AvatarURL;
import org.webstories.core.user.avatar.AvatarURLFactory;
import org.webstories.dao.IdentifiableEntity;

public class NewsFeedUserInfoFactory extends UserInfoFactory {
	private IdentifiableEntity identifiable;
	
	public NewsFeedUserInfoFactory( IdentifiableEntity identifiable ) {
		this.identifiable = identifiable;
	}
	
	@Override
	protected PersonName createName() {
		return PersonName.from( identifiable );
	}
	
	@Override
	protected String createEmail() {
		return identifiable.getEmail();
	}
	
	@Override
	protected AvatarURL createAvatarURL() {
		try {
			AvatarURL url = AvatarURLFactory.createFrom( identifiable );
			url.setWidth( 65 );
			url.setHeight( 65 );
			return url;
		} catch ( MalformedURLException e ) {
			throw new RuntimeException( "Failed to create avatar url", e );
		}
	}
	
	@Override
	protected String createProfileURL() {
		return identifiable.getProfileURL();
	}
}
