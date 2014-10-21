package org.webstories.web.convention.pages.home;

import java.util.List;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.LocalStoryReader;
import org.webstories.core.story.impl.HomeStory;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class ProjectsAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryReader storyReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {
		Logged logged = getLogged( request );
		List<HomeStory> userStories = storyReader.userStories( logged );
		request.setAttribute( "userStories", userStories );
		request.setAttribute( "nostory", userStories.isEmpty() );
		request.setAttribute( "firstStory", userStories.isEmpty() );
	}
}
