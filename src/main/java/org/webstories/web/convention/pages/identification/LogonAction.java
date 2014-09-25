package org.webstories.web.convention.pages.identification;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.AuthenticationException;
import org.webstories.core.auth.LocalFacebookAuthentication;
import org.webstories.core.auth.Logged;
import org.webstories.core.integration.FacebookOAuth2DataFactory;
import org.webstories.core.integration.FacebookOAuth2TokenFactory;
import org.webstories.core.integration.OAuth2Data;
import org.webstories.core.integration.OAuth2DataFactory;
import org.webstories.core.integration.OAuth2Token;
import org.webstories.core.integration.OAuth2TokenException;
import org.webstories.core.integration.OAuth2TokenFactory;
import org.webstories.core.invitation.LocalInviteAuthorization;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class LogonAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalFacebookAuthentication facebookAuth;
	
	@EJB
	LocalInviteAuthorization inviteAuthorization;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws IOException, ServletException {
		RequestParams params = RequestParams.from( request );
		
		// User refused to give access or something wrong happened
		if ( params.get( "error" ).toString() != null ) {
			response.sendRedirect( request.getContextPath() + "/" );
			return;
		}
		
		try {
			OAuth2Token token = requestToken( request );
			OAuth2Data data = retrieveData( request );
			Logged logged = facebookAuth.authenticate( token, data );
			setLogged( logged, request );
			response.sendRedirect( request.getContextPath() + "/home/" );
		} catch ( OAuth2TokenException | AuthenticationException e ) {
			throw new ServletException( e );
		}
	}
	
	private OAuth2Token requestToken( HttpServletRequest request ) throws OAuth2TokenException {
		OAuth2TokenFactory factory = new FacebookOAuth2TokenFactory( request );
		return factory.requestToken();
	}
	
	private OAuth2Data retrieveData( HttpServletRequest request ) {
		OAuth2DataFactory factory = new FacebookOAuth2DataFactory( request );
		return factory.createData();
	}
}
