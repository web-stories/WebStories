package org.webstories.dao.activity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.webstories.dao.story.StoryEntity;

@Entity
@Table( name = "ws_new_story" )
public class NewStoryActivityEntity extends ActivityEntity {
	@OneToOne( optional = false )
	@JoinColumn( name = "id_story" )
	private StoryEntity story;
	
	public void setStory( StoryEntity story ) {
		this.story = story;
	}
	public StoryEntity getStory() {
		return story;
	}
}
