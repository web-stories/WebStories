package org.webstories.dao.story;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.webstories.core.story.editor.EditorStoryDetailsInput;
import org.webstories.dao.NumerableEntity;

@Entity
@Table( name = "ws_meta" )
public class MetaEntity implements NumerableEntity {
	@Id
	@Column( nullable = false )
	private Long id_story;
	
	@Column( nullable = false, length = 255 )
	private String ds_title;
	
	@Column( nullable = false, length = 255 )
	private String ds_summary;
	
	@Column( nullable = false )
	private String ds_synopsis;
	
	@OneToOne( optional = false )
	@JoinColumn( name = "id_story", nullable = false )
	private StoryEntity story;
	
	public static MetaEntity from( EditorStoryDetailsInput input ) {
		MetaEntity meta = new MetaEntity();
		meta.ds_title = input.getTitle().toString();
		meta.ds_summary = input.getSummary().toString();
		meta.ds_synopsis = input.getSynopsis().toString();
		return meta;
	}
	
	public void update( EditorStoryDetailsInput input ) {
		this.ds_title = input.getTitle().toString();
		this.ds_summary = input.getSummary().toString();
		this.ds_synopsis = input.getSynopsis().toString();
	}
	
	@Override
	public Long getId() {
		return id_story;
	}
	
	public String getTitle() {
		return ds_title;
	}
	public String getSummary() {
		return ds_summary;
	}
	public String getSynopsis() {
		return ds_synopsis;
	}
	
	public StoryEntity getStory() {
		return story;
	}
	public void setStory( StoryEntity story ) {
		this.id_story = story.getId();
		this.story = story;
	}
}
