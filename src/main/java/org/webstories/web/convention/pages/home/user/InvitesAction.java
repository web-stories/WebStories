package org.webstories.web.convention.pages.home.user;

import java.util.List;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.invitation.LocalInviteReader;
import org.webstories.core.user.UserInfo;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpUnauthorizedException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
@SuppressWarnings( "serial" )
public class InvitesAction extends BaseServlet {
	@EJB
	LocalInviteReader inviteReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpUnauthorizedException {
		Logged logged = getLogged( request );
		List<String> availableInviteCodes = inviteReader.availableInvitations( logged );
		List<UserInfo> invitedUsers = inviteReader.invitedUsers( logged );
		
		request.setAttribute( "availableInviteCodes", availableInviteCodes );
		request.setAttribute( "invitedUsers", invitedUsers );
	}
}
