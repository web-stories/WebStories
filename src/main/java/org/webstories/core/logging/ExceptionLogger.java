package org.webstories.core.logging;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;

import org.webstories.core.auth.Logged;
import org.webstories.core.utils.ExceptionUtils;
import org.webstories.core.utils.ExceptionUtils.EmptyCauseException;
import org.webstories.dao.logging.AccessEntity;
import org.webstories.dao.logging.ExceptionEntity;
import org.webstories.dao.logging.LogEntity;

@Stateless
public class ExceptionLogger implements LocalExceptionLogger {
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void logAccessException( Logged logged, HttpServletRequest request, Throwable e ) {
		e.printStackTrace();
		
		LogEntity log = new LogEntity();
		entityManager.persist( log );
		
		ExceptionEntity exception = new ExceptionEntity();
		exception.setDateInc( System.currentTimeMillis() );
		exception.setException( e) ;
		setCauses( exception, e );
		entityManager.persist( exception );
		
		AccessEntity access = new AccessEntity();
		access.setIp( request.getRemoteAddr() );
		access.setData( "" ); // TODO
		entityManager.persist( access );
		
		log.setException( exception );
		
	}
	
	private void setCauses( ExceptionEntity exception, Throwable e ) {
		Throwable cause1 = null;
		Throwable cause2 = null;
		Throwable cause3 = null;
		
		try {
			cause1 = ExceptionUtils.getCause( e );
			cause2 = ExceptionUtils.getCause( cause1 );
			cause3 = ExceptionUtils.getCause( cause2 );
		} catch ( EmptyCauseException ex ) {}
		
		exception.setCause( cause1 );
		exception.setCause2( cause2 );
		exception.setCause3( cause3 );
	}
}
