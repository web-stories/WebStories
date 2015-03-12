package org.webstories.core.invitation;

import java.util.List;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.user.UserInfo;

@Local
public interface LocalInviteReader {
	List<String> availableInvitations( Logged logged );
	List<UserInfo> invitedUsers( Logged logged );
}
