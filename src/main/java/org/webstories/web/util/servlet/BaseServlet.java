package org.webstories.web.util.servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.webstories.core.auth.Logged;

public abstract class BaseServlet extends HttpServlet implements Authenticable {
	private static final long serialVersionUID = 1;
	@Override
	public Logged getLogged( HttpServletRequest request ) {
		HttpSession session = request.getSession();
		return ( Logged )session.getAttribute( "logged" );
	}
	@Override
	public void setLogged( Logged logged, HttpServletRequest request ) {
		HttpSession session = request.getSession();
		session.setAttribute( "logged", logged );
		session.setAttribute( "isLogged", true );
	}
	@Override
	public boolean isLogged( HttpServletRequest request ) {
		HttpSession session = request.getSession();
		return session.getAttribute( "isLogged" ) != null;
	}
}
