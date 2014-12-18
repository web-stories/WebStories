package org.webstories.web.convention.pages.home.projects;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.webstories.core.story.facade.LocalAuthorStoryReader;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class DetailsAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalAuthorStoryReader storyReader;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {
		RequestParams params = RequestParams.from( request );
		long idStory = params.get( "id" ).toLong();
		request.setAttribute( "story", storyReader.storyDetails( idStory ) );
		request.setAttribute( "saved", saved( request ) );
	}
	
	private boolean saved( HttpServletRequest request ) {
		HttpSession session = request.getSession();
		boolean saved = Boolean.TRUE.equals( session.getAttribute( "saved" ) );
		session.removeAttribute( "saved" );
		return saved;
	}
}
