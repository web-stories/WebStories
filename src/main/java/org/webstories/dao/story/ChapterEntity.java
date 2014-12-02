package org.webstories.dao.story;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
public class ChapterEntity implements NumerableEntity, PositionableEntity,
Comparable<ChapterEntity> {
	private ChapterEntity() {}
	
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
	private String ds_title = "";
	
	@Column( nullable = false )
	private Integer no_position;
	
	@Column( nullable = false, length = 255 )
	@Enumerated( EnumType.STRING )
	private StoryState cd_state = StoryState.DRAFT;
	
	@ManyToOne
	@JoinColumn( name = "id_story" )
	private StoryEntity story;
	
	@OneToMany( mappedBy = "chapter", orphanRemoval = true )
	private List<SectionEntity> sections = new ArrayList<SectionEntity>();
	
	/**
	 * @param  story
	 *         A managed and persistent story instance
	 */
	public static ChapterEntity createContentChapter(
		StoryEntity story,
		String title,
		int position,
		StoryState state
	) {
		ChapterEntity chapter = new ChapterEntity();
		chapter.setStory( story );
		chapter.setTitle( title );
		chapter.setPosition( position );
		chapter.setState( state );
		return chapter;
	}
	
	/**
	 * @param  story
	 *         A managed and persistent story instance
	 */
	public static ChapterEntity createEmptyChapter( StoryEntity story, int position ) {
		ChapterEntity chapter = new ChapterEntity();
		chapter.setStory( story );
		chapter.setPosition( position );
		return chapter;
	}
	
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
	
	@Override
	public Integer getPosition() {
		return no_position;
	}
	@Override
	public void setPosition( Integer no_position ) {
		this.no_position = no_position;
	}
	
	public StoryState getState() {
		return cd_state;
	}
	public void setState( StoryState cd_state ) {
		this.cd_state = cd_state;
	}
	
	public void setStory( StoryEntity story ) {
		this.story = story;
	}
	public StoryEntity getStory() {
		return story;
	}
	
	@Override
	public int compareTo( ChapterEntity other ) {
		if ( this.getPosition() > other.getPosition() ) {
			return 1;
		}
		if ( this.getPosition() < other.getPosition() ) {
			return -1;
		}
		return 0;
	}
	
	public List<SectionEntity> getSections() {
		Collections.sort( sections );
		return sections;
	}
}
