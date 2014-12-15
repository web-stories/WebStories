package org.webstories.dao.activity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;
import org.webstories.dao.user.UserEntity;

@Entity
@Table( name = "ws_activity" )
@Inheritance( strategy = InheritanceType.JOINED )
public abstract class ActivityEntity implements NumerableEntity {
	// Hibernate requires no-args constructor for this and subclasses.
	// Source: http://stackoverflow.com/a/2971717/1400037
	protected ActivityEntity() {}
	
	/**
	 * @param  user
	 *         A managed and persistent user instance
	 */
	protected ActivityEntity( UserEntity activityAuthor ) {
		this.user = activityAuthor;
		this.dt_inc = System.currentTimeMillis();
	}
	
	@Id
	@TableGenerator(
		name = "activity_sequence",
		pkColumnValue = "activity_sequence",
		table = "activity_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "activity_sequence" )
	private Long id_activity;
	
	@OneToOne( optional = false )
	@JoinColumn( name = "id_author", nullable = false )
	private UserEntity user;
	
	@Column( nullable = false )
	private long dt_inc;
	
	@Override
	public Long getId() {
		return id_activity;
	}
	
	public UserEntity getUser() {
		return user;
	}
	
	public long getDateInc() {
		return dt_inc;
	}
}
