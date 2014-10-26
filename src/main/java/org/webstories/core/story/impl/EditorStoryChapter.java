package org.webstories.core.story.impl;

import java.util.ArrayList;
import java.util.List;

import org.webstories.core.story.StoryChapter;
import org.webstories.core.text.Text;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.SectionEntity;

public class EditorStoryChapter implements StoryChapter {
	private Long id;
	private Text title;
	private Integer position;
	private List<EditorStorySection> sections = new ArrayList<EditorStorySection>();
	public static EditorStoryChapter from( ChapterEntity chapterEntity ) {
		EditorStoryChapter chapter = new EditorStoryChapter();
		chapter.id = chapterEntity.getId();
		chapter.title = Text.from( chapterEntity.getTitle() );
		chapter.position = chapterEntity.getPosition();
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
}
