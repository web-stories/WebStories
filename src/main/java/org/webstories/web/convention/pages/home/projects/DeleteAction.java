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
public class DeleteAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryEditor storyEditor;
	
	@Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		RequestParams params = RequestParams.from( request );
		long idStory = params.get( "id" ).toLong();
		Logged logged = getLogged( request );
		try {
			storyEditor.removeStory( idStory, logged );
			response.sendRedirect( request.getHeader( "referer" ) );
		} catch ( ValidationException | AccessDeniedException | UserNotLoggedException |
		IOException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
