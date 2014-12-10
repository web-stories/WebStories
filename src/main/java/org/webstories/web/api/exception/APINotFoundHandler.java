package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpNotFoundException;

@Provider
public class APINotFoundHandler extends APIExceptionHandler<HttpNotFoundException>
//https://issues.jboss.org/browse/RESTEASY-666#comment-12680849
implements ExceptionMapper<HttpNotFoundException>{
	@Override
	protected int getStatusCode() {
		return Status.NOT_FOUND.getStatusCode();
	}
}
