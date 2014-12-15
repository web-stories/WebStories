package org.webstories.core.story.viewer;

import org.webstories.core.story.StoryMeta;
import org.webstories.core.text.html.HTMLOutput;
import org.webstories.dao.story.MetaEntity;

public class StoryViewerDetails implements StoryMeta {
	private HTMLOutput title;
	private HTMLOutput summary;
	private HTMLOutput synopsis;
	public static StoryViewerDetails from( MetaEntity meta ) {
		StoryViewerDetails result = new StoryViewerDetails();
		result.title = HTMLOutput.fromUnsafeInput( meta.getTitle() );
		result.summary = HTMLOutput.fromUnsafeInput( meta.getSummary() );
		result.synopsis = HTMLOutput.fromUnsafeInput( meta.getSynopsis() );
		return result;
	}
	@Override
	public HTMLOutput getTitle() {
		return title;
	}
	@Override
	public HTMLOutput getSummary() {
		return summary;
	}
	@Override
	public HTMLOutput getSynopsis() {
		return synopsis;
	}
}
