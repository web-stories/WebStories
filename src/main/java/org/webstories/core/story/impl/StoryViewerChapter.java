package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;
import org.webstories.core.story.StorySection;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.SectionEntity;

public class StoryViewerChapter implements StoryChapter {
	private Long id;
	private String title;
	private Integer position;
	private List<StoryViewerSection> sections = new ArrayList<StoryViewerSection>();
	public static StoryViewerChapter from( ChapterEntity chapter ) {
		StoryViewerChapter result = new StoryViewerChapter();
		result.id = chapter.getId();
		result.title = HTMLText.fromPlainText( chapter.getTitle() ).toString();
		result.position = chapter.getPosition();
		for ( SectionEntity section : chapter.getSections() ) {
			result.sections.add( StoryViewerSection.from( section ) );
		}
		return result;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public String getTitle() {
		return title;
	}
	@Override
	public Integer getPosition() {
		return position;
	}
	@Override
	public List<? extends StorySection> getSections() {
		return sections;
	}
}
