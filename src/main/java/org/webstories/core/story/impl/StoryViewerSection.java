package org.webstories.core.story.impl;

import org.webstories.core.story.StorySection;
import org.webstories.core.text.html.ElementsProcessor;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.story.SectionEntity;

public class StoryViewerSection implements StorySection {
	private Long id;
	private String text;
	private Integer position;
	public static StoryViewerSection from( SectionEntity section ) {
		StoryViewerSection result = new StoryViewerSection();
		
		HTMLText text = HTMLText.fromPlainText( section.getText() );
		text.accept( new ElementsProcessor.Converter() );
		result.text = text.toString();
		
		result.id = section.getId();
		result.position = section.getPosition();
		return result;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public String getText() {
		return text;
	}
	@Override
	public Integer getPosition() {
		return position;
	}
}
