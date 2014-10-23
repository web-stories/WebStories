package org.webstories.core.story.impl;

import org.webstories.core.story.StoryMeta;
import org.webstories.dao.story.MetaEntity;

public class StoryViewerDetails implements StoryMeta {
	private String title;
	private String summary;
	private String synopsis;
	public static StoryViewerDetails from( MetaEntity meta ) {
		StoryViewerDetails result = new StoryViewerDetails();
		result.title = meta.getTitle();
		result.summary = meta.getSummary();
		result.synopsis = meta.getSynopsis();
		return result;
	}
	@Override
	public String getTitle() {
		return title;
	}
	@Override
	public String getSummary() {
		return summary;
	}
	@Override
	public String getSynopsis() {
		return synopsis;
	}
}
