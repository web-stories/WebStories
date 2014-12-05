package org.webstories.web.api.exception;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.webstories.web.util.servlet.HttpGoneException;

@Provider
public class APIGoneHandler extends APIExceptionHandler<HttpGoneException>
//https://issues.jboss.org/browse/RESTEASY-666#comment-12680849
implements ExceptionMapper<HttpGoneException>{
	@Override
	protected int getStatusCode() {
		return Status.GONE.getStatusCode();
	}
}
