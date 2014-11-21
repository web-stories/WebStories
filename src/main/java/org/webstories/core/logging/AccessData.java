package org.webstories.core.logging;

import java.util.Map;

public abstract class AccessData {
	protected String method;
	protected String uri;
	protected String originalURI;
	protected String protocol;
	protected Map<String, String> headers;
	protected Map<String, String> parameters;
	
	public AccessData( AccessDataFactory factory ) {
		this.method = factory.createMethod();
		this.uri = factory.createURI();
		this.originalURI = factory.createOriginalURI();
		this.protocol = factory.createProtocol();
		this.headers = factory.createHeaders();
		this.parameters = factory.createParameter();
	}
	
	public String getMethod() {
		return method;
	}
	
	public String getURI() {
		return uri;
	}
	
	public String getOriginalURI() {
		return originalURI;
	}
	
	public String getProtocol() {
		return protocol;
	}
	
	public Map<String, String> getHeaders() {
		return headers;
	}
	
	public Map<String, String> getParameter() {
		return parameters;
	}
	
	@Override
	public abstract String toString();
}
