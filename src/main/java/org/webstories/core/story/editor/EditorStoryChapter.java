package org.webstories.core.story.editor;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;
import org.webstories.core.text.Text;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.SectionEntity;
import org.webstories.dao.story.StoryState;

public class EditorStoryChapter implements StoryChapter {
	private Long id;
	private Text title;
	private Integer position;
	private boolean published;
	private Boolean publishable;
	private List<EditorStorySection> sections = new ArrayList<EditorStorySection>();
	public static EditorStoryChapter from( ChapterEntity chapterEntity ) {
		EditorStoryChapter chapter = new EditorStoryChapter();
		chapter.id = chapterEntity.getId();
		chapter.title = Text.from( chapterEntity.getTitle() );
		chapter.position = chapterEntity.getPosition();
		chapter.published = chapterEntity.getState() == StoryState.PUBLISHED;
		for ( SectionEntity section : chapterEntity.getSections() ) {
			EditorStorySection storySection = EditorStorySection.from( section );
			chapter.sections.add( storySection );
		}
		return chapter;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public Text getTitle() {
		return title;
	}
	@Override
	public Integer getPosition() {
		return position;
	}
	@Override
	public List<EditorStorySection> getSections() {
		return sections;
	}
	@Override
	public boolean isPublished() {
		return published;
	}
	public Boolean getPublishable() {
		return publishable;
	}
	public void setPublishable( Boolean publishable ) {
		this.publishable = publishable;
	}
}
