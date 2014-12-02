package org.webstories.web.api.exception;

import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpUnprocessableEntityException;

@Provider
public class APIUnprocessableEntityHandler extends APIExceptionHandler<HttpUnprocessableEntityException> {
	@Override
	protected int getStatusCode() {
		return 422; // UNPROCESSABLE_ENTITY
	}
}
