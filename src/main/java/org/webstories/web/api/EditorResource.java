package org.webstories.web.api;

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
import org.webstories.core.story.editor.EditorStory;
import org.webstories.core.story.facade.LocalStoryEditor;
import org.webstories.core.story.facade.LocalStoryReader;
import org.webstories.core.validation.ValidationException;
import org.webstories.web.util.servlet.HttpForbiddenException;
import org.webstories.web.util.servlet.HttpUnauthorizedException;
import org.webstories.web.util.servlet.HttpUnprocessableEntityException;

@Path( "/editor" )
@Consumes( MediaType.APPLICATION_JSON )
@Produces( MediaType.APPLICATION_JSON )
public class EditorResource {
	@Context
	HttpServletRequest request;
	
	@EJB
	LocalStoryEditor storyEditor;
	
	@EJB
	LocalStoryReader storyReader;
	
	@GET
	@Path( "{storyId}" )
	public EditorStory editorGet( @PathParam( "storyId" ) Long storyId ) {
		return storyReader.storyEditor( storyId );
	}
	
	@POST
	@Path( "{storyId}/chapters/{chapterId}/sections/{sectionId}" )
	public void sectionCreate( @PathParam( "sectionId" ) Long idPrevSection )
	throws HttpUnauthorizedException, HttpForbiddenException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			storyEditor.addSection( idPrevSection, logged );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		}
	}
	
	@POST
	@Path( "{storyId}/chapters" )
	public void chaptersSave( @PathParam( "storyId" ) Long storyId )
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
	public void publicationPublish( @PathParam( "chapterId" ) Long chapterId )
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
}
