package org.webstories.web.util.servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;

public abstract class BaseServlet extends HttpServlet implements Authenticable {
	private static final long serialVersionUID = 1;
	@Override
	public Logged getLogged( HttpServletRequest request ) throws HttpUnauthorizedException {
		try {
			return AuthSession.from( request ).getLogged();
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		}
	}
	@Override
	public void setLogged( Logged logged, HttpServletRequest request ) {
		AuthSession.from( request ).setLogged( logged );
	}
	@Override
	public boolean isLogged( HttpServletRequest request ) {
		return AuthSession.from( request ).isLogged();
	}
}
