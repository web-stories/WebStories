package org.webstories.dao.logging;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.webstories.dao.NumerableEntity;

@Table( name = "ws_log" )
public class LogEntity implements NumerableEntity {
	@Id
	@TableGenerator(
		name = "log_sequence",
		pkColumnValue = "log_sequence",
		table = "log_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "log_sequence" )
	private Long id_log;
	
	@OneToOne
	@JoinColumn( name = "id_log", nullable = false )
	private ExceptionEntity exception;
	
	public Long getId() {
		return id_log;
	}
	public void setId( Long id_log ) {
		this.id_log = id_log;
	}
	
	public ExceptionEntity getException() {
		return exception;
	}
	public void setException( ExceptionEntity exception ) {
		this.exception = exception;
	}
}
