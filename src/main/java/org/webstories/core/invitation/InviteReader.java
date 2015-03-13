package org.webstories.core.invitation;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;
import org.webstories.core.user.UserInfo;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.invitation.InviteEntity;
import org.webstories.dao.invitation.InviteQueries;
import org.webstories.dao.user.UserEntity;

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
	@Override
	public List<UserInfo> invitedUsers( Logged logged ) {
		long idUser = logged.getId();
		List<UserInfo> result = new ArrayList<UserInfo>();
		List<InviteEntity> usedInvitations = inviteQueries.findUsedInvitations( idUser );
		
		for ( InviteEntity invite : usedInvitations ) {
			UserEntity invited = invite.getInvited();
			// Invitation not taken yet
			if ( invited == null ) {
				continue;
			}
			FacebookEntity facebook = invited.getFacebook();
			GuestUserInfoFactory factory = new GuestUserInfoFactory( facebook );
			result.add( new UserInfo( factory ) );
		}
		
		return result;
	}
}
