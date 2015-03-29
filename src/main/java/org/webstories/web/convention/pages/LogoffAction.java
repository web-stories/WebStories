package org.webstories.web.convention.pages;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.webstories.core.auth.Logged;
import org.webstories.core.integration.client.IntegrationClient;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;
import org.webstories.web.util.servlet.HttpUnauthorizedException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class LogoffAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		HttpSession session = request.getSession( false );
		try {
			try {
				Logged logged = getLogged( request );
				IntegrationClient integration = logged.getIntegration();
				
				session.invalidate();
				
				if ( integration != null ) {
					String logoutUrl = integration.getLogoutURL();
					response.sendRedirect( logoutUrl );
				}
			} catch ( HttpUnauthorizedException e ) {
				response.sendRedirect( request.getContextPath() );
			}
		} catch ( IOException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
