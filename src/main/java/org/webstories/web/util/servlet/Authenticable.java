package org.webstories.web.util.servlet;

import javax.servlet.http.HttpServletRequest;

import org.webstories.core.auth.Logged;

public interface Authenticable {
	Logged getLogged( HttpServletRequest request ) throws HttpUnauthorizedException;
	boolean isLogged( HttpServletRequest request );
	void setLogged( Logged logged, HttpServletRequest request );
}
