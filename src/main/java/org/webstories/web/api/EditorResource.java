package org.webstories.web.api;

import java.util.List;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.webstories.core.ResourceNotFoundException;
import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.editor.EditorStory;
import org.webstories.core.story.editor.EditorStoryChapter;
import org.webstories.core.story.editor.EditorStoryChapterInput;
import org.webstories.core.story.editor.EditorStorySection;
import org.webstories.core.story.editor.EditorStorySectionInput;
import org.webstories.core.story.editor.RemovalResult;
import org.webstories.core.story.facade.LocalStoryEditor;
import org.webstories.core.story.facade.LocalStoryReader;
import org.webstories.core.validation.ValidationException;
import org.webstories.core.validation.ValidationObject;
import org.webstories.web.util.servlet.HttpForbiddenException;
import org.webstories.web.util.servlet.HttpNotFoundException;
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
	
	@PUT
	@Path( "{storyId}/chapters/{chapterId}/sections/{sectionId}" )
	public EditorStorySection sectionPersist(
		@PathParam( "sectionId" ) Long sectionId,
		EditorStorySectionInput input
	) throws HttpUnauthorizedException, HttpForbiddenException {
		Logged logged = AuthSession.from( request ).getLogged();
		String text = input.getText().toString();
		try {
			return storyEditor.updateSection( sectionId, text, logged );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		}
	}
	
	@POST
	@Path( "{storyId}/chapters/{chapterId}/sections" )
	public EditorStorySection sectionCreate( @QueryParam( "prevSectionId" ) Long prevSectionId )
	throws HttpUnauthorizedException, HttpForbiddenException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			return storyEditor.addSection( prevSectionId, logged );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		}
	}
	
	@DELETE
	@Path( "{storyId}/chapters/{chapterId}/sections/{sectionId}" )
	public RemovalResult sectionRemove( @PathParam( "sectionId" ) Long sectionId )
	throws HttpForbiddenException, HttpUnauthorizedException, HttpNotFoundException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			return storyEditor.removeSection( sectionId, logged );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		} catch ( ResourceNotFoundException e ) {
			throw new HttpNotFoundException( e );
		}
	}
	
	@PUT
	@Path( "{storyId}/chapters/{chapterId}" )
	public EditorStoryChapter chapterPersist(
		@PathParam( "chapterId" ) Long chapterId,
		EditorStoryChapterInput input
	) throws HttpUnauthorizedException, HttpForbiddenException {
		Logged logged = AuthSession.from( request ).getLogged();
		String title = input.getTitle().toString();
		try {
			return storyEditor.updateChapter( chapterId, title, logged );
		} catch ( AccessDeniedException e ) {
			throw new HttpForbiddenException( e );
		} catch ( UserNotLoggedException e ) {
			throw new HttpUnauthorizedException( e );
		}
	}
	
	@POST
	@Path( "{storyId}/chapters" )
	public EditorStoryChapter chapterCreate( @PathParam( "storyId" ) Long storyId )
	throws HttpUnauthorizedException, HttpForbiddenException {
		Logged logged = AuthSession.from( request ).getLogged();
		try {
			return storyEditor.addChapter( storyId, logged );
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
	
	@POST
	@Path( "{storyId}/publications/{chapterId}/validate" )
	public List<ValidationObject> publicationValidate( @PathParam( "chapterId" ) Long chapterId ) {
		return storyReader.validateChapter( chapterId );
	}
}
