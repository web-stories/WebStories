package org.webstories.dao.story;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;

@Entity
@Table( name = "ws_section" )
public class SectionEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "section_sequence",
		pkColumnValue = "section_sequence",
		table = "section_sequences"
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "section_sequence" )
	private Long id_section;
	
	@Column( nullable = false )
	private String ds_text;
	
	@ManyToOne
	@JoinColumn( name = "id_chapter", nullable = false )
	private ChapterEntity chapter;
	
	@Override
	public Long getId() {
		return id_section;
	}
	
	public String getText() {
		return ds_text;
	}
	
	public ChapterEntity getChapter() {
		return chapter;
	}
	public void setChapter( ChapterEntity chapter ) {
		this.chapter = chapter;
	}
}
