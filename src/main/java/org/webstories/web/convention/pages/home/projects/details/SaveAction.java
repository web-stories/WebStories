package org.webstories.web.convention.pages.home.projects.details;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.story.LocalStoryEditor;
import org.webstories.core.story.StoryMetaInput;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;

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
	throws IOException {
		RequestParams params = RequestParams.from( request );
		long idStory = params.get( "idStory" ).toLong();
		StoryMetaInput input =  StoryMetaInput.from( params );
		storyEditor.updateMeta( idStory, input );
		response.sendRedirect( request.getHeader( "referer" ) );
	}
}