package org.webstories.dao.integration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.webstories.core.auth.PersonName;
import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.NumerableEntity;
import org.webstories.dao.user.UserEntity;

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
	
	@Column( nullable = false, length = 255 )
	private String url_profile;
	
	@OneToOne
	@JoinColumn( name = "id_user", nullable = false )
	private UserEntity user;
	
	public static FacebookEntity from(
		PersonName name,
		String email,
		String uid,
		UserEntity user
	) {
		FacebookEntity facebook = new FacebookEntity();
		facebook.cod_uid = uid;
		facebook.ds_email = email;
		facebook.nm_first = name.getFirst();
		facebook.nm_last = name.getLast();
		facebook.id_user = user.getId();
		facebook.user = user;
		return facebook;
	}
	
	@Override
	public Long getId() {
		return id_user;
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
	@Override
	public String getProfileURL() {
		return url_profile;
	}
	public UserEntity getUser() {
		return user;
	}
}
