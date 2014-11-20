package org.webstories.dao.logging;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.core.utils.ExceptionUtils;
import org.webstories.dao.NumerableEntity;

@Entity
@Table( name = "ws_exception" )
public class ExceptionEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "exception_sequence",
		pkColumnValue = "exception_sequence",
		table = "exception_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "exception_sequence" )
	private Long id_exception;
	
	@Column( nullable = false )
	private String ds_exception;
	
	private String ds_cause;
	private String ds_cause2;
	private String ds_cause3;
	
	@Column( nullable = false )
	private Long dt_inc;
	
	@OneToOne
	@JoinColumn( name = "id_log", nullable = false )
	private LogEntity log;
	
	public Long getId() {
		return id_exception;
	}
	public void setId( Long id_exception ) {
		this.id_exception = id_exception;
	}
	
	public String getException() {
		return ds_exception;
	}
	public void setException( Throwable ds_exception ) {
		this.ds_exception = ExceptionUtils.toString( ds_exception );
	}
	
	public String getCause() {
		return this.ds_cause;
	}
	public void setCause( Throwable ds_cause ) {
		this.ds_cause = ExceptionUtils.toString( ds_cause );
	}
	
	public String getCause2() {
		return this.ds_cause2;
	}
	public void setCause2( Throwable ds_cause2 ) {
		this.ds_cause2 = ExceptionUtils.toString( ds_cause2 );
	}
	
	public String getCause3() {
		return this.ds_cause3;
	}
	public void setCause3( Throwable ds_cause3 ) {
		this.ds_cause3 = ExceptionUtils.toString( ds_cause3 );
	}
	
	public Long getDateInc() {
		return dt_inc;
	}
	public void setDateInc( Long dt_inc ) {
		this.dt_inc = dt_inc;
	}
	
	public LogEntity getLog() {
		return log;
	}
	public void setLog( LogEntity log ) {
		this.log = log;
	}
}