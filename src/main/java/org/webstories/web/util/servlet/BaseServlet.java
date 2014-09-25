package org.webstories.web.util.servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.webstories.core.auth.Logged;

public abstract class BaseServlet extends HttpServlet implements Authenticable {
	private static final long serialVersionUID = 1;
	@Override
	public Logged getLogged( HttpServletRequest request ) {
		return ( Logged )request.getSession().getAttribute( "logged" );
	}
	@Override
	public void setLogged( Logged logged, HttpServletRequest request ) {
		request.getSession().setAttribute( "logged", logged );
	}
	@Override
	public boolean isLogged( HttpServletRequest request ) {
		return request.getSession().getAttribute( "logged" ) != null;
	}
}
