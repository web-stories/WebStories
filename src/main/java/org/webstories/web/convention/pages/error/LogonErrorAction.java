package org.webstories.web.convention.pages.error;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.api.exception.ErrorObject;
import org.webstories.web.util.servlet.ErrorServlet;

@WebServlet
@SuppressWarnings( "serial" )
public class LogonErrorAction extends ErrorServlet {
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws IOException {
		Throwable e = ( Throwable )request.getAttribute( RequestDispatcher.ERROR_EXCEPTION );
		ErrorObject error = LogonErrors.translate( e );
		request.setAttribute( "error", error );
		response.setStatus( HttpServletResponse.SC_UNAUTHORIZED );
	}
}
