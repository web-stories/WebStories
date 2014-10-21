package org.webstories.dao.invitation;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;

@Entity
@Table( name = "ws_invite" )
public class InviteEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "invite_sequence",
		pkColumnValue = "invite_sequence",
		table = "invite_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "invite_sequence" )
	private Long id_invite;
	
	@Column( nullable = false, unique = true, length = 255 )
	private String ds_email;
	
	@Column( nullable = false, unique = true, length = 255 )
	private String cod_invite;
	
	@Override
	public Long getId() {
		return id_invite;
	}
	public void setId( Long id_invite ) {
		this.id_invite = id_invite;
	}
	
	public String getEmail() {
		return ds_email;
	}
	public void setEmail( String ds_email ) {
		this.ds_email = ds_email;
	}
	
	public String getInviteCode() {
		return cod_invite;
	}
	public void setInviteCode( String cod_invite ) {
		this.cod_invite = cod_invite;
	}
}
