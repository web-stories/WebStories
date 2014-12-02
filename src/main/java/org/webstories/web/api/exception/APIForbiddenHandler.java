package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpForbiddenException;

@Provider
public class APIForbiddenHandler extends APIExceptionHandler<HttpForbiddenException> {
	@Override
	protected int getStatusCode() {
		return Status.FORBIDDEN.getStatusCode();
	}
}
