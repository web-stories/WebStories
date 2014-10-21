package org.webstories.core.auth.http;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.webstories.core.auth.AuthenticationException;
import org.webstories.core.auth.Logged;
import org.webstories.core.utils.SHA256;
import org.webstories.core.utils.SHA256Exception;
import org.webstories.dao.user.UserEntity;
import org.webstories.dao.user.UserQueries;

@Stateless
public class HttpAuthentication implements LocalHttpAuthentication {
	@EJB
	UserQueries userQueries;
	
	@Override
	public Logged authenticate( HttpAuthData data ) throws AuthenticationException {
		try {
			UserEntity user = userQueries.findByUsername( data.getUsername() );
			String encryptedInput = SHA256.encrypt( data.getPassword() );
			if ( user.getPassword().equals( encryptedInput ) ) {
				return Logged.from( user );
			}
		} catch ( SHA256Exception e ) {
			throw new AuthenticationException( e );
		}
		throw new AuthenticationException();
	}
}
