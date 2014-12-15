package org.webstories.dao.activity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.user.UserEntity;

@Entity
@Table( name = "ws_chapter_published" )
public class ChapterPublishedActivity extends ActivityEntity {
	protected ChapterPublishedActivity() {}
	public ChapterPublishedActivity( UserEntity activityAuthor ) {
		super( activityAuthor );
	}
	
	@OneToOne( optional = false )
	@JoinColumn( name = "id_chapter", nullable = false )
	private ChapterEntity chapter;
	
	public void setChapter( ChapterEntity chapter ) {
		this.chapter = chapter;
	}
	public ChapterEntity getChapter() {
		return chapter;
	}
}
