package org.webstories.web.util.servlet;

import javax.servlet.ServletException;

public class HttpGoneException extends ServletException {
	private static final long serialVersionUID = 1;
	public HttpGoneException( Throwable cause ) {
		super( cause );
	}
}
