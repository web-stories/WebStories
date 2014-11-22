package org.webstories.dao;

import org.webstories.core.user.AccountProvider;

public interface IdentifiableEntity {
	String getFirstName();
	String getLastName();
	String getEmail();
	String getProfileURL();
	String getAvatarURL();
	AccountProvider getAccountProvider();
}
