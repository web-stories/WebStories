package org.webstories.core.invitation;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;
import org.webstories.dao.invitation.InviteEntity;
import org.webstories.dao.invitation.InviteQueries;

@Stateless
public class InviteReader implements LocalInviteReader {
	@EJB
	InviteQueries inviteQueries;
	
	@Override
	public List<String> availableInvitations( Logged logged ) {
		long idUser = logged.getId();
		List<String> codes = new ArrayList<String>();
		List<InviteEntity> invites = inviteQueries.findAvailableInvitations( idUser );
		
		for ( InviteEntity invitation : invites ) {
			codes.add( invitation.getInviteCode() );
		}
		
		return codes;
	}
}
