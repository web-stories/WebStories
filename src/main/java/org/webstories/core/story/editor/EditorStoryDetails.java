package org.webstories.core.story.editor;

import org.webstories.core.story.StoryMeta;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.story.MetaEntity;

public class EditorStoryDetails implements StoryMeta {
	private Long id;
	private HTMLText title;
	private HTMLText summary;
	private HTMLText synopsis;
	public static EditorStoryDetails from( MetaEntity meta ) {
		EditorStoryDetails details = new EditorStoryDetails();
		details.id = meta.getId();
		details.title = HTMLText.fromPlainText( meta.getTitle() );
		details.summary = HTMLText.fromPlainText( meta.getSummary() );
		details.synopsis = HTMLText.fromPlainText( meta.getSynopsis() );
		return details;
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
	public Long getId() {
		return id;
	}
}
