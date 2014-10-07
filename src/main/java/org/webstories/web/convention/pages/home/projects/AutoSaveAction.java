package org.webstories.web.convention.pages.home.projects;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class AutoSaveAction  extends BaseServlet {
	private static final long serialVersionUID = 1;
	@Override
	protected void doPut( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		RequestParams params = RequestParams.from( request );
		try {
			Thread.sleep( 3000 );
			response.setContentType( "application/json" );
			response.getOutputStream().print( params.get( "chapters" ).toString() );
		} catch ( InterruptedException | IOException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
