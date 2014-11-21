package org.webstories.core.user;

import org.webstories.dao.IdentifiableEntity;

public class ThumbnailUserInfoFactory extends UserInfoFactory {
	private IdentifiableEntity identifiable;
	
	public ThumbnailUserInfoFactory( IdentifiableEntity identifiable ) {
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
	protected String createAvatarURL() {
		// TODO avatar image URL should provide a square 60x60 spec
		return identifiable.getAvatarURL();
	}
	
	@Override
	protected String createProfileURL() {
		return identifiable.getProfileURL();
	}
}
