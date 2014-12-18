package org.webstories.core.story.facade;

import java.util.List;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.editor.EditorStory;
import org.webstories.core.story.editor.EditorStoryDetails;
import org.webstories.core.story.thumb.HomeStory;
import org.webstories.core.validation.ValidationObject;

@Local
public interface LocalAuthorStoryReader {
	List<HomeStory> authorStories( Logged logged );
	EditorStoryDetails storyDetails( long idStory );
	EditorStory storyEditor( long idStory );
	List<ValidationObject> validateChapter( long chapterId );
}
