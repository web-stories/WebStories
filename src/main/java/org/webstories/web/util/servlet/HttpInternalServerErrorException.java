package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

public class HttpInternalServerErrorException extends ServletException {
	private static final long serialVersionUID = 1;
	public HttpInternalServerErrorException( Throwable cause ) {
		super( cause );
	}
}
