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
	
	@ManyToOne
	@JoinColumn( name = "id_story", nullable = false )
	private StoryEntity story;
	
	@Override
	public Long getId() {
		return id_chapter;
	}
	public String getTitle() {
		return ds_title;
	}
	
	public StoryEntity getStory() {
		return story;
	}
	public void setStory( StoryEntity story ) {
		this.story = story;
	}
}
