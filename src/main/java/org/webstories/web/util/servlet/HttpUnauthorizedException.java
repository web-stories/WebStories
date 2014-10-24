package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

public class HttpUnauthorizedException extends ServletException {
	private static final long serialVersionUID = 1;
	public HttpUnauthorizedException( Throwable cause ) {
		super( cause );
	}
}
