package org.webstories.core.story.viewer;

import org.webstories.core.story.StoryMeta;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.story.MetaEntity;

public class StoryViewerDetails implements StoryMeta {
	private HTMLText title;
	private HTMLText summary;
	private HTMLText synopsis;
	public static StoryViewerDetails from( MetaEntity meta ) {
		StoryViewerDetails result = new StoryViewerDetails();
		result.title = HTMLText.fromPlainText( meta.getTitle() );
		result.summary = HTMLText.fromPlainText( meta.getSummary() );
		result.synopsis = HTMLText.fromPlainText( meta.getSynopsis() );
		return result;
	}
	@Override
	public HTMLText getTitle() {
		return title;
	}
	@Override
	public HTMLText getSummary() {
		return summary;
	}
	@Override
	public HTMLText getSynopsis() {
		return synopsis;
	}
}
