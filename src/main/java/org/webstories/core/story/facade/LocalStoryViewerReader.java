package org.webstories.core.story.facade;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;

@Local
public interface LocalStoryViewerReader {
	boolean isPubliclyViewable( long idStory );
	boolean isPreviewable( long idStory, Logged logged );
}
