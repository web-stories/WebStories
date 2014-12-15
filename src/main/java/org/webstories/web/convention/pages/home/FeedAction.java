package org.webstories.web.convention.pages.home;

import java.nio.file.AccessDeniedException;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.feed.LocalNewsFeed;
import org.webstories.core.feed.item.FeedItem;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class FeedAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalNewsFeed newsFeed;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException {
		Logged logged = getLogged( request );
		try {
			List<FeedItem> feedItems = newsFeed.feedItems( logged );
			request.setAttribute( "feedItems", feedItems );
		} catch ( AccessDeniedException | UserNotLoggedException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
