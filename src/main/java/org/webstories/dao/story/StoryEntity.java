package org.webstories.dao.story;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;
import org.webstories.dao.user.UserEntity;

@Entity
@Table( name = "ws_story" )
public class StoryEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "story_sequence",
		pkColumnValue = "story_sequence",
		table = "story_sequences"
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "story_sequence" )
	private Long id_story;
	
	@ManyToOne( optional = false )
	@JoinColumn( name = "id_author", nullable = false )
	private UserEntity author;
	
	@OneToOne( mappedBy = "story", optional = false )
	private MetaEntity meta;
	
	@Override
	public Long getId() {
		return id_story;
	}
	
	public UserEntity getAuthor() {
		return author;
	}
	public void setAuthor( UserEntity author ) {
		this.author = author;
	}
	
	public void setId( Long id_story ) {
		this.id_story = id_story;
	}
	
	public MetaEntity getMeta() {
		return meta;
	}
}
