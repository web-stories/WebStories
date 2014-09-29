package org.webstories.dao.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;
import org.webstories.dao.integration.FacebookEntity;

import com.restfb.types.User;

@Entity
@Table( name = "ws_user" )
public class UserEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "user_sequence",
		pkColumnValue = "user_sequence",
		table = "user_sequences"
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "user_sequence" )
	private Long id_user;
	
	@OneToOne( mappedBy = "user", optional = false )
	private FacebookEntity facebook;
	
	public static UserEntity from( User facebookUser ) {
		return new UserEntity();
	}
	
	@Override
	public Long getId() {
		return id_user;
	}
	public void setId( Long id_user ) {
		this.id_user = id_user;
	}
	
	public FacebookEntity getFacebook() {
		return facebook;
	}
}
