package org.webstories.core.logging;

import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

public class AccessDataFactory {
	private HttpServletRequest request;
	
	public AccessDataFactory( HttpServletRequest request ) {
		this.request = request;
	}
	
	public String createMethod() {
		return request.getMethod();
	}
	
	public String createURI() {
		return request.getRequestURI();
	}
	
	public String createOriginalURI() {
		return ( String )request.getAttribute( RequestDispatcher.ERROR_REQUEST_URI );
	}
	
	public String createProtocol() {
		return request.getProtocol();
	}
	
	public Map<String, String> createHeaders() {
		Map<String, String> result = new LinkedHashMap<String, String>();
		Enumeration<String> headerNames = request.getHeaderNames();
		while ( headerNames.hasMoreElements() ) {
			String name = headerNames.nextElement();
			String value = request.getHeader( name );
			result.put( name, value );
		}
		return result;
	}
	
	public Map<String, String> createParameter() {
		Map<String, String> result = new LinkedHashMap<String, String>();
		Enumeration<String> parameterNames = request.getParameterNames();
		while ( parameterNames.hasMoreElements() ) {
			String name = parameterNames.nextElement();
			String value = request.getParameter( name );
			result.put( name, value );
		}
		return result;
	}
}
