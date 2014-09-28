package org.webstories.core.story;

import org.webstories.dao.story.MetaEntity;

public class StoryMetaView extends StoryMeta {
	public static StoryMetaView from( MetaEntity meta ) {
		StoryMetaView view = new StoryMetaView();
		view.title = meta.getTitle();
		view.summary = meta.getSummary();
		view.synopsis = meta.getSynopsis();
		return view;
	}
}
