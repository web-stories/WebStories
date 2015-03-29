package org.webstories.web.util.servlet;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.logging.LocalAppLogger;

@SuppressWarnings( "serial" )
public abstract class ErrorServlet extends BaseServlet {
	@EJB
	LocalAppLogger logger;
	
	@Override
	protected abstract void doGet( HttpServletRequest request, HttpServletResponse response )
		throws IOException;
	@Override
	protected void service( HttpServletRequest request, HttpServletResponse response )
	throws ServletException, IOException {
		Logged logged;
		Throwable e = ( Throwable )request.getAttribute( RequestDispatcher.ERROR_EXCEPTION );
		
		// logAccess reqquires a "null" contract for a Logged instance. So prevent throwing
		// the exception upwards before the logging occurs.
		try {
			logged = getLogged( request );
		} catch ( HttpUnauthorizedException exception ) {
			logged = null;
		}
		
		logger.logAccess( logged, request, e );
		
		super.service( request, response );
	}
}
