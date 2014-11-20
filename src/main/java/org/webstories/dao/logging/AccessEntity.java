package org.webstories.dao.logging;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;
import org.webstories.dao.user.UserEntity;

@Entity
@Table( name = "ws_access"  )
public class AccessEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "access_sequence",
		pkColumnValue = "access_sequence",
		table = "access_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "access_sequence" )
	private Long id_access;
	
	@Column( nullable = false, length = 255 )
	private String ds_ip;
	
	@Column( nullable = false )
	private String ds_data;
	
	@OneToOne
	@JoinColumn( name = "id_log", nullable = false )
	private LogEntity log;
	
	@ManyToOne
	@JoinColumn( name = "id_user" )
	private UserEntity logged;
	
	public Long getId() {
		return id_access;
	}
	public void setId( Long id_access ) {
		this.id_access = id_access;
	}
	
	public String getIp() {
		return ds_ip;
	}
	public void setIp( String ds_ip ) {
		this.ds_ip = ds_ip;
	}
	
	public String getData() {
		return ds_data;
	}
	public void setData( String ds_data ) {
		this.ds_data = ds_data;
	}
	
	public LogEntity getLog() {
		return log;
	}
	public void setLog( LogEntity log ) {
		this.log = log;
	}
	
	public UserEntity getLogged() {
		return logged;
	}
	public void setLogged( UserEntity logged ) {
		this.logged = logged;
	}
}
