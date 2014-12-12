package org.webstories.web.convention.pages.view.stories;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.facade.LocalStoryReader;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpForbiddenException;
import org.webstories.web.util.servlet.HttpUnauthorizedException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class PreviewAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryReader storyReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpForbiddenException, HttpUnauthorizedException {
		Logged logged = getLogged( request );
		RequestParams params = RequestParams.from( request );
		long idStory = params.get( "id" ).toLong();
		
		try {
			request.setAttribute( "story", storyReader.storyPreviewer( idStory, logged ) );
			request.setAttribute( "details", storyReader.storyViewerDetails( idStory ) );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		}
	}

}
