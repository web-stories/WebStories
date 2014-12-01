package org.webstories.web.api.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpValidationException;

@Provider
public class APIValidationHandler implements ExceptionMapper<HttpValidationException> {
	@Override
	public Response toResponse( HttpValidationException exception ) {
		return Response
			.status( 422 /* UNPROCESSABLE_ENTITY */ )
			.entity( ErrorObjectFactory.create( exception ) )
			.build();
	}
}
