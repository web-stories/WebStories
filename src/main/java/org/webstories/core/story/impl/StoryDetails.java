package org.webstories.core.story.impl;

import org.webstories.core.story.StoryMeta;
import org.webstories.dao.story.MetaEntity;

public class StoryDetails implements StoryMeta {
	private Long id;
	private String title;
	private String summary;
	private String synopsis;
	public static StoryDetails from( MetaEntity meta ) {
		StoryDetails details = new StoryDetails();
		details.id = meta.getId();
		details.title = meta.getTitle();
		details.summary = meta.getSummary();
		details.synopsis = meta.getSynopsis();
		return details;
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
	public Long getId() {
		return id;
	}
}
