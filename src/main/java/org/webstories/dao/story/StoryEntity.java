package org.webstories.dao.story;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;

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
	
	@Override
	public Long getId() {
		return id_story;
	}
	public void setId( Long id_story ) {
		this.id_story = id_story;
	}
}
