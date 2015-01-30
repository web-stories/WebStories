package org.webstories.core.story.facade;

import java.util.List;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.viewer.StorySlide;
import org.webstories.core.story.viewer.StoryViewer;

@Local
public interface LocalStoryViewerReader {
	boolean isPubliclyViewable( long idStory );
	boolean isPreviewable( long idStory, Logged logged );
	List<StorySlide> publicSlides( long idStory );
	List<StorySlide> previewSlides( long idStory, Logged logged ) throws AccessDeniedException;
	StoryViewer publicStory( long idStory );
	StoryViewer previewedStory( long idStory, Logged logged ) throws AccessDeniedException;
}
