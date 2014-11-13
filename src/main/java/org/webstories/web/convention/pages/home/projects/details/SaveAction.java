package org.webstories.web.convention.pages.home.projects.details;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.webstories.core.auth.Logged;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.editor.EditorStoryDetailsInput;
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
public class SaveAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryEditor storyEditor;
	
	@Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		Logged logged = getLogged( request );
		RequestParams params = RequestParams.from( request );
		HttpSession session = request.getSession();
		long idStory = params.get( "idStory" ).toLong();
		EditorStoryDetailsInput input =  EditorStoryDetailsInput.from( params );
		try {
			storyEditor.updateMeta( idStory, input, logged );
			session.setAttribute( "saved", true );
			response.sendRedirect( request.getHeader( "referer" ) );
		} catch ( IOException | ValidationException | AccessDeniedException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
