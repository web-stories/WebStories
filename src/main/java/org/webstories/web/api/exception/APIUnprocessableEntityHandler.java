package org.webstories.web.api.exception;

import org.webstories.web.util.servlet.HttpUnprocessableEntityException;

public class APIUnprocessableEntityHandler extends APIExceptionHandler<HttpUnprocessableEntityException> {
	@Override
	protected int getStatusCode() {
		return 422; // UNPROCESSABLE_ENTITY
	}
}
