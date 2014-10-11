package org.webstories.dao.story;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.core.story.impl.EditorStoryChapterInput;
import org.webstories.dao.NumerableEntity;

@Entity
@Table( name = "ws_chapter" )
public class ChapterEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "chapter_sequence",
		pkColumnValue = "chapter_sequence",
		table = "chapter_sequences"
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "chapter_sequence" )
	private Long id_chapter;
	
	@Column( nullable = false, length = 255 )
	private String ds_title;
	
	@Column( nullable = false )
	private Long id_story;
	
	@OneToMany
	@JoinColumn( name = "id_chapter" )
	private List<SectionEntity> sections = new ArrayList<SectionEntity>();
	
	public static ChapterEntity from( long idStory, EditorStoryChapterInput chapterInput ) {
		ChapterEntity chapter = new ChapterEntity();
		chapter.id_chapter = chapterInput.getId();
		chapter.id_story = idStory;
		chapter.ds_title = chapterInput.getTitle();
		return chapter;
	}
	
	@Override
	public Long getId() {
		return id_chapter;
	}
	
	public String getTitle() {
		return ds_title;
	}
	
	public void addSection( SectionEntity section ) {
		this.sections.add( section );
	}
}
