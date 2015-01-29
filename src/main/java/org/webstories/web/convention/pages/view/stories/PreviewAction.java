package org.webstories.web.convention.pages.view.stories;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.facade.LocalStoryViewerReader;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpNotFoundException;
import org.webstories.web.util.servlet.HttpUnauthorizedException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class PreviewAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryViewerReader storyReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpNotFoundException, HttpUnauthorizedException {
		Logged logged = getLogged( request );
		RequestParams params = RequestParams.from( request );
		long idStory = params.get( "id" ).toLong();
		
		if ( !storyReader.isPreviewable( idStory, logged ) ) {
			String msg = String.format(
				"This story cannot be previewed by %s: %s",
				logged.getFullName(),
				idStory
			);
			throw new HttpNotFoundException( msg );
		}
	}
}
