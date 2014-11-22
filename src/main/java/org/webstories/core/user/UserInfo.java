package org.webstories.core.user;

import org.webstories.core.user.avatar.AvatarURL;

public class UserInfo {
	private PersonName name;
	private String email;
	private String profileURL;
	private AvatarURL avatarURL;
	public UserInfo( UserInfoFactory factory ) {
		this.name = factory.createName();
		this.email = factory.createEmail();
		this.profileURL = factory.createProfileURL();
		this.avatarURL = factory.createAvatarURL();
	}
	public PersonName getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public String getProfileURL() {
		return profileURL;
	}
	public AvatarURL getAvatarURL() {
		return avatarURL;
	}
	
	@Override
	public String toString() {
		return name.toString();
	}
}
