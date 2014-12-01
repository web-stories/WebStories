package org.webstories.web.api;

import java.util.List;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.Story;
import org.webstories.core.story.editor.EditorStoryChapter;
import org.webstories.core.story.editor.EditorStoryInput;
import org.webstories.core.story.facade.LocalStoryEditor;
import org.webstories.core.story.facade.LocalStoryReader;
import org.webstories.core.validation.ValidationException;
import org.webstories.core.validation.ValidationObject;
import org.webstories.web.util.servlet.HttpForbiddenException;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;
import org.webstories.web.util.servlet.HttpUnauthorizedException;
import org.webstories.web.util.servlet.HttpUnprocessableEntityException;

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
	public Story saveStory( @PathParam( "id" ) Long idStory, EditorStoryInput story )
	throws HttpInternalServerErrorException, HttpUnauthorizedException, HttpForbiddenException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			storyEditor.updateStory( story, logged );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		} catch ( ValidationException e ) {
			throw new HttpInternalServerErrorException( e );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		}
		return storyReader.storyEditor( idStory );
	}
	
	@POST
	@Path( "{storyId}/chapters" )
	public void saveChapter( @PathParam( "storyId" ) Long storyId )
	throws HttpUnauthorizedException, HttpForbiddenException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			storyEditor.addChapter( storyId, logged );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		}
	}
	
	@PUT
	@Path( "{storyId}/publications/{chapterId}" )
	public void publishChapter( @PathParam( "chapterId" ) Long chapterId )
	throws HttpForbiddenException, HttpUnauthorizedException, HttpUnprocessableEntityException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			storyEditor.publishChapter( chapterId, logged );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		} catch ( ValidationException e ) {
			throw new HttpUnprocessableEntityException( e );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		}
	}
	
	@GET
	@Path( "{storyId}/chapters" )
	public List<EditorStoryChapter> queryChapters( @PathParam( "storyId" ) Long storyId ) {
		return storyReader.storyEditorChapters( storyId );
	}
	
	@POST
	@Path( "{storyId}/chapters/{chapterId}/validate" )
	public List<ValidationObject> validateChapter( @PathParam( "chapterId" ) Long chapterId ) {
		return storyReader.validateChapter( chapterId );
	}
}
