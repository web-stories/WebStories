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
import org.webstories.core.utils.SHA256;
import org.webstories.dao.user.UserQueries;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;
import org.webstories.web.util.servlet.HttpUnauthorizedException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class LogonAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalFacebookAuthentication facebookAuth;
	
	@EJB
	LocalInviteAuthorization inviteAuthorization;
	
	@EJB
	UserQueries userQueries;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws IOException, ServletException {
		RequestParams params = RequestParams.from( request );
		OAuth2Data data = retrieveData( request );
		
		// User refused to give access or something wrong happened
		if ( params.get( "error" ).toString() != null ) {
			response.sendRedirect( data.getRedirect() );
			return;
		}
		
		try {
			OAuth2Token token = requestToken( request );
			Logged logged = facebookAuth.authenticate( token, data );
			setLogged( logged, request );
			response.sendRedirect( data.getRedirect() );
		} catch ( AuthenticationException e ) {
			throw new HttpUnauthorizedException( e );
		} catch ( OAuth2TokenException e ) {
			throw new ServletException( e );
		}
	}
	
	@Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		// There's no default login implementation yet, this is just for internal use
		
		try {
			String secret = request.getParameter( "secret" );
			String actual = SHA256.encrypt( secret );
			String expected = "6db8e0d9747198a8c4a9a0a6b93e72676aeb2cbc6a75b98d5a96520f13ab9d19";
			
			if ( actual.equals( expected ) ) {
				Logged logged = Logged.from( userQueries.findByPrimaryKey( 1L ) );
				setLogged( logged, request );
			}
			
			response.sendRedirect( request.getContextPath() + "/home/projects" );
		} catch ( Exception e ) {
			throw new HttpInternalServerErrorException( e );
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
