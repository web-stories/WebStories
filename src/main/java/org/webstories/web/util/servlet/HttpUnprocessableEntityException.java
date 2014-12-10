package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

public class HttpUnprocessableEntityException extends ServletException {
	private static final long serialVersionUID = 1;
	public HttpUnprocessableEntityException( Throwable cause ) {
		super( cause );
	}
}
