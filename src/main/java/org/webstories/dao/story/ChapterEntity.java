package org.webstories.dao.story;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;

@Entity
@Table( name = "ws_chapter" )
public class ChapterEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "chapter_sequence",
		pkColumnValue = "chapter_sequence",
		table = "chapter_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "chapter_sequence" )
	private Long id_chapter;
	
	@Column( nullable = false, length = 255 )
	private String ds_title;
	
	@Column( nullable = false )
	private Integer no_position;
	
	@ManyToOne
	@JoinColumn( name = "id_story", nullable = true )
	private StoryEntity story;
	
	@OneToMany( mappedBy = "chapter", orphanRemoval = true )
	private List<SectionEntity> sections = new ArrayList<SectionEntity>();
	
	@Override
	public Long getId() {
		return id_chapter;
	}
	public void setId( Long id_chapter ) {
		this.id_chapter = id_chapter;
	}
	
	public String getTitle() {
		return ds_title;
	}
	public void setTitle( String ds_title ) {
		this.ds_title = ds_title;
	}
	
	public Integer getPosition() {
		return no_position;
	}
	public void setPosition( Integer no_position ) {
		this.no_position = no_position;
	}
	
	public void setStory( StoryEntity story ) {
		this.story = story;
	}
	
	public List<SectionEntity> getSections() {
		return sections;
	}
}
