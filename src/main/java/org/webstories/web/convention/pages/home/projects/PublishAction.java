package org.webstories.web.convention.pages.home.projects;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class PublishAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	@Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response ) {
		RequestParams params = RequestParams.from( request );
		try {
			long idChapter = params.get( "chapter" ).toLong();
			response.sendRedirect( request.getHeader( "referer" ) );
		} catch ( IOException e ) {
			e.printStackTrace();
		}
	}
}
