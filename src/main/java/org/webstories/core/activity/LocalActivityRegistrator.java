package org.webstories.core.activity;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;

@Local
public interface LocalActivityRegistrator {
	void registerJoinedActivity( Logged logged );
	void registerChapterPublishActivity( long idChapter, Logged logged );
	void registerNewStoryActivity( long idStory, Logged logged );
}
