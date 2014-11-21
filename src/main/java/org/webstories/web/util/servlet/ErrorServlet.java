package org.webstories.web.util.servlet;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.logging.LocalAppLogger;

public abstract class ErrorServlet extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalAppLogger exceptionLogger;
	
	@Override
	protected abstract void doGet( HttpServletRequest request, HttpServletResponse response );
	@Override
	protected void service( HttpServletRequest request, HttpServletResponse response )
	throws ServletException, IOException {
		Logged logged = getLogged( request );
		Throwable e = ( Throwable )request.getAttribute( RequestDispatcher.ERROR_EXCEPTION );
		
		exceptionLogger.logAccess( logged, request, e );
		
		super.service( request, response );
	}
}
