package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

@SuppressWarnings( "serial" )
public class HttpUnprocessableEntityException extends ServletException {
	public HttpUnprocessableEntityException( Throwable cause ) {
		super( cause );
	}
}
