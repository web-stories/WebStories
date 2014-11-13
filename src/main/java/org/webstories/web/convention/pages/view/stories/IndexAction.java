package org.webstories.web.convention.pages.view.stories;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.story.facade.LocalStoryReader;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class IndexAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryReader storyReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		RequestParams params = RequestParams.from( request );
		long idStory = params.get( "id" ).toLong();
		request.setAttribute( "story", storyReader.storyViewer( idStory ) );
		request.setAttribute( "details", storyReader.storyViewerDetails( idStory ) );
	}
}
