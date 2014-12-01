package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

public class HttpValidationException extends ServletException {
	private static final long serialVersionUID = 1;
	public HttpValidationException( Throwable cause ) {
		super( cause );
	}
}
