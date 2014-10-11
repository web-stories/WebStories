package org.webstories.web.api;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.LocalStoryEditor;
import org.webstories.core.story.LocalStoryReader;
import org.webstories.core.story.Story;
import org.webstories.core.story.impl.EditorStoryInput;
import org.webstories.core.validation.ValidationException;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

@Path( "/stories" )
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public class StoriesResource {
	@Context
	HttpServletRequest request;
	
	@EJB
	LocalStoryEditor storyEditor;
	
	@EJB
	LocalStoryReader storyReader;
	
	@PUT
	@Path( "{id}/save" )
	public Story save( @PathParam( "id" ) Long idStory, EditorStoryInput story )
	throws HttpInternalServerErrorException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			storyEditor.updateStory( story, logged );
		} catch ( ValidationException | AccessDeniedException e ) {
			throw new HttpInternalServerErrorException( e );
		}
		return storyReader.storyEditor( idStory );
	}
}
