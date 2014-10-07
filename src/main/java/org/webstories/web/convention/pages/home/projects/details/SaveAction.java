package org.webstories.web.convention.pages.home.projects.details;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.webstories.core.story.LocalStoryEditor;
import org.webstories.core.story.impl.StoryMetaInput;
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
		RequestParams params = RequestParams.from( request );
		HttpSession session = request.getSession();
		long idStory = params.get( "idStory" ).toLong();
		StoryMetaInput input =  StoryMetaInput.from( params );
		try {
			storyEditor.updateMeta( idStory, input );
			session.setAttribute( "saved", true );
			response.sendRedirect( request.getHeader( "referer" ) );
		} catch ( IOException | ValidationException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
