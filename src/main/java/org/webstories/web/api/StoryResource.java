package org.webstories.web.api;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.facade.LocalStoryViewerReader;
import org.webstories.core.story.viewer.StoryViewer;
import org.webstories.web.util.servlet.HttpForbiddenException;
import org.webstories.web.util.servlet.HttpUnauthorizedException;

@Path( "/story" )
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public class StoryResource {
	@Context
	HttpServletRequest request;
	
	@EJB
	LocalStoryViewerReader storyReader;
	
	@GET
	@Path( "{storyId}" )
	public StoryViewer storyGet( @PathParam( "storyId" ) Long storyId ) {
		return storyReader.publicStory( storyId );
	}
	
	@GET
	@Path( "{storyId}/preview" )
	public StoryViewer storyPreviewGet( @PathParam( "storyId" ) Long storyId )
	throws HttpUnauthorizedException, HttpForbiddenException {
		try {
			Logged logged = AuthSession.from( request ).getLogged();
			return storyReader.previewedStory( storyId, logged );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		}
	}
}
