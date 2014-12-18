package org.webstories.web.convention.pages.view.stories;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class PreviewAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {
		//RequestParams params = RequestParams.from( request );
		//long idStory = params.get( "id" ).toLong();
		// TODO story exists?
	}
}
