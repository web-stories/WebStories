package org.webstories.core.user;

import org.webstories.core.user.avatar.AvatarURL;

public abstract class UserInfoFactory {
	protected abstract PersonName createName();
	protected abstract String createEmail();
	protected abstract AvatarURL createAvatarURL();
	protected abstract String createProfileURL();
}
