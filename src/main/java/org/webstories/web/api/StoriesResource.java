package org.webstories.web.api;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.webstories.core.story.Story;
import org.webstories.core.story.impl.EditorStoryInput;

@Path( "/stories" )
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public class StoriesResource {
	@Context
	private HttpServletRequest request;
	
	@PUT
	@Path( "{id}/save" )
	public Story save( @PathParam( "id" ) Long id, EditorStoryInput story ) {
		// TODO Insert data into the system
		return story;
	}
}