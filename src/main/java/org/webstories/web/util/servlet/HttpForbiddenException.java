package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

@SuppressWarnings( "serial" )
public class HttpForbiddenException extends ServletException {
	public HttpForbiddenException( Throwable cause ) {
		super( cause );
	}
}
