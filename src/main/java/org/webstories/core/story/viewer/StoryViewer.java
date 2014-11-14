package org.webstories.core.story.viewer;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.Story;
import org.webstories.core.story.StoryChapter;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.StoryEntity;

public class StoryViewer implements Story {
	private Long id;
	private List<StoryViewerChapter> chapters = new ArrayList<StoryViewerChapter>();
	public static StoryViewer from( StoryEntity story ) {
		StoryViewer viewer = new StoryViewer();
		viewer.id = story.getId();
		for ( ChapterEntity chapter : story.getChapters() ) {
			StoryViewerChapter viewerChapter = StoryViewerChapter.from( chapter );
			if ( !viewerChapter.isPublished() ) {
				continue;
			}
			viewer.chapters.add( viewerChapter );
		}
		return viewer;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public List<? extends StoryChapter> getChapters() {
		return chapters;
	}
}
