package org.webstories.core.invitation;

import javax.ejb.Local;

@Local
public interface LocalInviteCreator {
	void increaseUserInvitations( long idUser );
}
