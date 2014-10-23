package org.webstories.web.convention.pages.view;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.story.LocalStoryReader;
import org.webstories.core.story.impl.StoryViewer;
import org.webstories.core.validation.ValidationException;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class StoriesAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryReader storyReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		RequestParams params = RequestParams.from( request );
		try {
			StoryViewer viewer = storyReader.storyViewer( params.get( "id" ) );
			request.setAttribute( "story", viewer );
		} catch ( ValidationException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
