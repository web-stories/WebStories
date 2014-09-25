package org.webstories.core.invitation;

import javax.ejb.Local;

@Local
public interface LocalInviteAuthorization {
	boolean isValidInvitation( String inviteCode );
}
