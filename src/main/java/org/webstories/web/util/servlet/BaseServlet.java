package org.webstories.web.util.servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.eclipse.jdt.annotation.Nullable;
import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;

public abstract class BaseServlet extends HttpServlet implements Authenticable {
	private static final long serialVersionUID = 1;
	@Override
	public @Nullable Logged getLogged( HttpServletRequest request ) {
		return AuthSession.from( request ).getLogged();
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
