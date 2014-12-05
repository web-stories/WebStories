package org.webstories.web.api.exception;

import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpUnprocessableEntityException;

@Provider
public class APIUnprocessableEntityHandler
extends APIExceptionHandler<HttpUnprocessableEntityException>
//https://issues.jboss.org/browse/RESTEASY-666#comment-12680849
implements ExceptionMapper<HttpUnprocessableEntityException>{
	@Override
	protected int getStatusCode() {
		return 422; // UNPROCESSABLE_ENTITY
	}
}
