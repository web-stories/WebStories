package org.webstories.core.activity;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;

@Local
public interface LocalActivityRegistrator {
	void registerJoinedActivity( Logged logged ) throws UserNotLoggedException;
	void registerChapterPublishActivity( long idChapter, Logged logged )
		throws UserNotLoggedException;
	void registerNewStoryActivity( long idStory, Logged logged )
		throws UserNotLoggedException;
}
