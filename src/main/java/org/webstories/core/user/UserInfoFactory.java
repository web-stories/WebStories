package org.webstories.core.user;

public abstract class UserInfoFactory {
	protected abstract PersonName createName();
	protected abstract String createEmail();
	protected abstract String createAvatarURL();
	protected abstract String createProfileURL();
}
