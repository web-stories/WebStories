package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;

import org.webstories.web.util.servlet.HttpInternalServerErrorException;

public class APIServerErrorHandler extends APIExceptionHandler<HttpInternalServerErrorException> {
	@Override
	protected int getStatusCode() {
		return Status.INTERNAL_SERVER_ERROR.getStatusCode();
	}
}
