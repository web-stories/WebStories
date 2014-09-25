package org.webstories.web.util.params;

import javax.servlet.http.HttpServletRequest;

public class RequestParams {
	private HttpServletRequest request;
	private RequestParams( HttpServletRequest request ) {
		this.request = request;
	}
	public static RequestParams from( HttpServletRequest request ) {
		return new RequestParams( request );
	}
	public DefaultRequestParam get( String key ) {
		String value = request.getParameter( key );
		return new DefaultRequestParam( value );
	}
}
