package org.webstories.web.api.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpInternalServerErrorException;

@Provider
public class APIForbiddenHandler implements ExceptionMapper<HttpInternalServerErrorException> {
	@Override
	public Response toResponse( HttpInternalServerErrorException exception ) {
		return Response
			.status( Status.FORBIDDEN )
			.entity( ErrorObjectFactory.create( exception ) )
			.build();
	}	
}
