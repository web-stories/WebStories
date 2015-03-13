package org.webstories.core.user;

import org.webstories.dao.IdentifiableEntity;

public abstract class IdentifiableUserInfoFactory extends UserInfoFactory {
	protected IdentifiableEntity identifiable;
	
	public IdentifiableUserInfoFactory( IdentifiableEntity identifiable ) {
		this.identifiable = identifiable;
	}
	
	@Override
	public PersonName createName() {
		return PersonName.from( identifiable );
	}
	
	@Override
	public String createEmail() {
		return identifiable.getEmail();
	}
	
	@Override
	public String createProfileURL() {
		return identifiable.getProfileURL();
	}
}
