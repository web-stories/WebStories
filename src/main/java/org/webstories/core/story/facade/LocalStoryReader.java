package org.webstories.core.story.facade;

import java.util.List;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.story.editor.EditorStory;
import org.webstories.core.story.editor.EditorStoryDetails;
import org.webstories.core.story.thumb.FeaturedStory;
import org.webstories.core.story.thumb.HomeStory;
import org.webstories.core.story.viewer.StoryViewer;
import org.webstories.core.story.viewer.StoryViewerDetails;
import org.webstories.core.validation.ValidationObject;

@Local
public interface LocalStoryReader {
	List<HomeStory> userStories( Logged logged );
	List<FeaturedStory> featuredStories();
	EditorStoryDetails storyDetails( long idStory );
	EditorStory storyEditor( long idStory );
	StoryViewer storyViewer( long idStory );
	StoryViewer storyPreviewer( long idStory, Logged logged )
		throws AccessDeniedException, UserNotLoggedException;
	StoryViewerDetails storyViewerDetails( long idStory );
	List<ValidationObject> validateChapter( long chapterId );
}
