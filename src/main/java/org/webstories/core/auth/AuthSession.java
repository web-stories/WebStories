package org.webstories.core.auth;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class AuthSession {
	private HttpSession session;
	private AuthSession( HttpSession session ) {
		this.session = session;
	}
	public static AuthSession from( HttpServletRequest request ) {
		return new AuthSession( request.getSession() );
	}
	public Logged getLogged() {
		return ( Logged )session.getAttribute( "logged" );
	}
	public void setLogged( Logged logged ) {
		session.setAttribute( "logged", logged );
		session.setAttribute( "isLogged", true );
	}
	public boolean isLogged() {
		return session.getAttribute( "isLogged" ) != null;
	}
}
