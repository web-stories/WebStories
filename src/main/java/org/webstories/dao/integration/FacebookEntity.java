package org.webstories.dao.integration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;

@Entity
@Table( name = "ws_facebook" )
public class FacebookEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "facebook_sequence",
		pkColumnValue = "facebook_sequence",
		table = "facebook_sequences"
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "facebook_sequence" )
	private Long id_facebook;
	
	@Column( nullable = false, unique = true, length = 255 )
	private String cod_uid;
	
	@Column( nullable = false, unique = true, length = 255 )
	private String ds_email;
	
	@Column( nullable = false, length = 255 )
	private String nm_first;
	
	@Column( nullable = false, length = 255 )
	private String nm_last;
	
	@Override
	public Long getId() {
		return id_facebook;
	}
	public void setId( Long id_facebook ) {
		this.id_facebook = id_facebook;
	}
	
	public String getFacebookId() {
		return cod_uid;
	}
	public void setFacebookId( String cod_uid ) {
		this.cod_uid = cod_uid;
	}
	
	public String getEmail() {
		return ds_email;
	}
	public void setEmail( String ds_email ) {
		this.ds_email = ds_email;
	}
	
	public String getFirstName() {
		return nm_first;
	}
	public void setFirstName( String nm_first ) {
		this.nm_first = nm_first;
	}
	
	public String getLastName() {
		return nm_last;
	}
	public void setLastName( String nm_last ) {
		this.nm_last = nm_last;
	}
}
