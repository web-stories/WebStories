package org.webstories.web.convention.pages.home.projects;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.facade.LocalStoryEditor;
import org.webstories.core.validation.ValidationException;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class PublishAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryEditor storyEditor;
	
	@Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		RequestParams params = RequestParams.from( request );
		Logged logged = getLogged( request );
		long idChapter = params.get( "chapterId" ).toLong();
		try {
			storyEditor.publishChapter( idChapter, logged );
			response.sendRedirect( request.getHeader( "referer" ) );
		} catch ( IOException | ValidationException | AccessDeniedException |
		UserNotLoggedException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
