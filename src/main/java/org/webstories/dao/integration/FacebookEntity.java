package org.webstories.dao.integration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.NumerableEntity;
import org.webstories.dao.user.UserEntity;

import com.restfb.types.User;

@Entity
@Table( name = "ws_facebook" )
public class FacebookEntity implements NumerableEntity, IdentifiableEntity {
	@Id
	@Column( nullable = false )
	private Long id_user;
	
	@Column( nullable = false, unique = true, length = 255 )
	private String cod_uid;
	
	@Column( nullable = false, unique = true, length = 255 )
	private String ds_email;
	
	@Column( nullable = false, length = 255 )
	private String nm_first;
	
	@Column( nullable = false, length = 255 )
	private String nm_last;
	
	@OneToOne
	@JoinColumn( name = "id_user", nullable = false )
	private UserEntity user;
	
	public static FacebookEntity from( User facebookUser ) {
		FacebookEntity facebook = new FacebookEntity();
		facebook.cod_uid = facebookUser.getId();
		facebook.ds_email = facebookUser.getEmail();
		facebook.nm_first = facebookUser.getFirstName();
		facebook.nm_last = facebookUser.getLastName();
		return facebook;
	}
	
	public UserEntity getUser() {
		return user;
	}
	public void setUser( UserEntity user ) {
		this.id_user = user.getId();
		this.user = user;
	}
	@Override
	public Long getId() {
		return id_user;
	}
	public void setId( Long id_user ) {
		this.id_user = id_user;
	}
	
	public String getFacebookId() {
		return cod_uid;
	}
	@Override
	public String getEmail() {
		return ds_email;
	}
	@Override
	public String getFirstName() {
		return nm_first;
	}
	@Override
	public String getLastName() {
		return nm_last;
	}
}
