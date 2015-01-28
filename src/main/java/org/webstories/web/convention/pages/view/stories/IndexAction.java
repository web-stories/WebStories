package org.webstories.web.convention.pages.view.stories;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.story.facade.LocalStoryViewerReader;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpNotFoundException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class IndexAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryViewerReader storyReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpNotFoundException {
		RequestParams params = RequestParams.from( request );
		long idStory = params.get( "id" ).toLong();
		
		if ( !storyReader.isPubliclyViewable( idStory ) ) {
			throw new HttpNotFoundException( "Story not found" + idStory );
		}
	}
}
