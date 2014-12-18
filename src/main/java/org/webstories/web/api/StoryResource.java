package org.webstories.web.api;

import java.util.List;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.webstories.core.story.facade.LocalStoryViewerReader;
import org.webstories.core.story.viewer.StorySlide;

@Path( "/story" )
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public class StoryResource {
	@Context
	HttpServletRequest request;
	
	@EJB
	LocalStoryViewerReader storyReader;
	
	@GET
	@Path( "{storyId}/slides" )
	public List<StorySlide> slidesGet( @PathParam( "storyId" ) Long storyId ) {
		return storyReader.publicSlides( storyId );
	}
}
