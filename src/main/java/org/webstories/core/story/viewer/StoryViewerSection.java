package org.webstories.core.story.viewer;

import org.webstories.core.story.StorySection;
import org.webstories.core.text.html.ElementsProcessor;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.story.SectionEntity;

public class StoryViewerSection implements StorySection {
	private Long id;
	private HTMLText text;
	private Integer position;
	public static StoryViewerSection from( SectionEntity section ) {
		StoryViewerSection result = new StoryViewerSection();
		
		HTMLText text = HTMLText.fromUnsafeInput( section.getText() );
		text.accept( new ElementsProcessor.Converter() );
		result.text = text;
		
		result.id = section.getId();
		result.position = section.getPosition();
		return result;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public HTMLText getText() {
		return text;
	}
	@Override
	public Integer getPosition() {
		return position;
	}
}
