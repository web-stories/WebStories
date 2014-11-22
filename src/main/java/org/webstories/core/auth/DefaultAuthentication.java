package org.webstories.core.auth;

import java.util.UUID;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.user.PersonName;
import org.webstories.core.utils.SHA256;
import org.webstories.core.utils.SHA256Exception;
import org.webstories.dao.user.UserEntity;
import org.webstories.dao.user.UserQueries;

@Stateless
public class DefaultAuthentication implements LocalDefaultAuthentication {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	UserQueries userQueries;
	
	@Override
	public long register( PersonName name ) throws AuthenticationException {
		try {
			String password = SHA256.encrypt( UUID.randomUUID().toString() );
			String username = generateUsername( name );
			UserEntity user = UserEntity.from( username, password );
			entityManager.persist( user );
			return user.getId();
		} catch ( SHA256Exception e ) {
			throw new AuthenticationException( e );
		}
	}
	
	private String generateUsername( PersonName name ) throws AuthenticationException {
		UsernameGenerator generator = new UsernameGenerator( name );
		while ( !userQueries.exists( generator.next() ) ) {
			return generator.getCurrent();
		}
		throw new AuthenticationException();
	}
}
