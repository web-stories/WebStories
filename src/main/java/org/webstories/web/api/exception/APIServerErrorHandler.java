package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpInternalServerErrorException;

@Provider
public class APIServerErrorHandler extends APIExceptionHandler<HttpInternalServerErrorException> {
	@Override
	protected int getStatusCode() {
		return Status.INTERNAL_SERVER_ERROR.getStatusCode();
	}
}
