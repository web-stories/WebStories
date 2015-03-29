package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

@SuppressWarnings( "serial" )
public class HttpNotFoundException extends ServletException {
	public HttpNotFoundException( String msg ) {
		super( msg );
	}
	public HttpNotFoundException( Throwable cause ) {
		super( cause );
	}
}
