package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

@SuppressWarnings( "serial" )
public class HttpInternalServerErrorException extends ServletException {
	public HttpInternalServerErrorException( Throwable cause ) {
		super( cause );
	}
}
