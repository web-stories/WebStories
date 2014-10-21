package org.webstories.dao.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;
import org.webstories.dao.integration.FacebookEntity;

@Entity
@Table( name = "ws_user" )
public class UserEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "user_sequence",
		pkColumnValue = "user_sequence",
		table = "user_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "user_sequence" )
	private Long id_user;
	
	@Column( nullable = false, length = 255 )
	private String ds_username;
	
	@Column( nullable = false, length = 255 )
	private String ds_password;
	
	@OneToOne( mappedBy = "user", optional = false )
	private FacebookEntity facebook;
	
	public static UserEntity from( String ds_username, String ds_password ) {
		UserEntity user = new UserEntity();
		user.ds_username = ds_username;
		user.ds_password = ds_password;
		return user;
	}
	
	@Override
	public Long getId() {
		return id_user;
	}
	
	public String getUsername() {
		return ds_username;
	}
	
	public String getPassword() {
		return ds_password;
	}
	
	public FacebookEntity getFacebook() {
		return facebook;
	}
}
