package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

@SuppressWarnings( "serial" )
public class HttpUnauthorizedException extends ServletException {
	public HttpUnauthorizedException( Throwable cause ) {
		super( cause );
	}
}
