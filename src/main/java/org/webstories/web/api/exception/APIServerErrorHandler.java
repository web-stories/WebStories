package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpInternalServerErrorException;

@Provider
public class APIServerErrorHandler extends APIExceptionHandler<HttpInternalServerErrorException>
//https://issues.jboss.org/browse/RESTEASY-666#comment-12680849
implements ExceptionMapper<HttpInternalServerErrorException>{
	@Override
	protected int getStatusCode() {
		return Status.INTERNAL_SERVER_ERROR.getStatusCode();
	}
}
