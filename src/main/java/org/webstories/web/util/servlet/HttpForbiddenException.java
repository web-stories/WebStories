package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

public class HttpForbiddenException extends ServletException {
	private static final long serialVersionUID = 1;
	public HttpForbiddenException( Throwable cause ) {
		super( cause );
	}
}
