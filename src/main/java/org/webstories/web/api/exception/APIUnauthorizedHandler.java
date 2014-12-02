package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpUnauthorizedException;

@Provider
public class APIUnauthorizedHandler extends APIExceptionHandler<HttpUnauthorizedException> {
	@Override
	protected int getStatusCode() {
		return Status.UNAUTHORIZED.getStatusCode();
	}
}
