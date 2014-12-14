package org.webstories.dao.activity;

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
	@JoinColumn( name = "id_user", nullable = false )
	private UserEntity user;
	
	@Override
	public Long getId() {
		return id_activity;
	}
	
	public void setUser( UserEntity user ) {
		this.user = user;
	}
}
