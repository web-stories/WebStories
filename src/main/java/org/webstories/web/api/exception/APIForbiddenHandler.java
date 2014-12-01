package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;

import org.webstories.web.util.servlet.HttpForbiddenException;

public class APIForbiddenHandler extends APIExceptionHandler<HttpForbiddenException> {
	@Override
	protected int getStatusCode() {
		return Status.FORBIDDEN.getStatusCode();
	}
}
