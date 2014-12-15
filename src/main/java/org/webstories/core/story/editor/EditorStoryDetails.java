package org.webstories.core.story.editor;

import org.webstories.core.story.StoryMeta;
import org.webstories.core.text.html.HTMLOutput;
import org.webstories.dao.story.MetaEntity;

public class EditorStoryDetails implements StoryMeta {
	private Long id;
	private HTMLOutput title;
	private HTMLOutput summary;
	private HTMLOutput synopsis;
	public static EditorStoryDetails from( MetaEntity meta ) {
		EditorStoryDetails details = new EditorStoryDetails();
		details.id = meta.getId();
		details.title = HTMLOutput.fromUnsafeInput( meta.getTitle() );
		details.summary = HTMLOutput.fromUnsafeInput( meta.getSummary() );
		details.synopsis = HTMLOutput.fromUnsafeInput( meta.getSynopsis() );
		return details;
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
	public Long getId() {
		return id;
	}
}
