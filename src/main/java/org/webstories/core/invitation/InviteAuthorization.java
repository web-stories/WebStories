package org.webstories.core.invitation;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.dao.invitation.InviteQueries;

@Stateless
public class InviteAuthorization implements LocalInviteAuthorization {
	@EJB
	InviteQueries inviteQueries;
	
	@Override
	public boolean isValidInvitation( String inviteCode ) {
		return inviteQueries.exists( inviteCode );
	}
}
