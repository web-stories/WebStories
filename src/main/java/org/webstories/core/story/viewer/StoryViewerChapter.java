package org.webstories.core.story.viewer;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;
import org.webstories.core.story.StorySection;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.SectionEntity;
import org.webstories.dao.story.StoryState;

public class StoryViewerChapter implements StoryChapter {
	private Long id;
	private HTMLText title;
	private Integer position;
	private boolean published;
	private List<StoryViewerSection> sections = new ArrayList<StoryViewerSection>();
	public static StoryViewerChapter from( ChapterEntity chapter ) {
		StoryViewerChapter result = new StoryViewerChapter();
		result.id = chapter.getId();
		result.title = HTMLText.fromUnsafeInput( chapter.getTitle() );
		result.position = chapter.getPosition();
		result.published = chapter.getState() == StoryState.PUBLISHED;
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
	public HTMLText getTitle() {
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
	@Override
	public boolean isPublished() {
		return published;
	}
}
