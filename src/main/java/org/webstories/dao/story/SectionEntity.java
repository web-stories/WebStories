package org.webstories.dao.story;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	
	@Column( nullable = false )
	private Long id_chapter;
	
	@Override
	public Long getId() {
		return id_section;
	}
	
	public String getText() {
		return ds_text;
	}
	public void setText( String ds_text ) {
		this.ds_text = ds_text;
	}
	
	public void setIdChapter( Long id_chapter ) {
		this.id_chapter = id_chapter;
	}
}
