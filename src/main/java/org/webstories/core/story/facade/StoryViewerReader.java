package org.webstories.core.story.facade;

import javax.ejb.Stateless;

import org.webstories.core.auth.Logged;

@Stateless
public class StoryViewerReader implements LocalStoryViewerReader {
	@Override
	public boolean isPubliclyViewable( long idStory ) {
		// TODO implement
		return false;
	}
	@Override
	public boolean isPreviewable( long idStory, Logged logged ) {
		// TODO implement
		return false;
	}
	
}
