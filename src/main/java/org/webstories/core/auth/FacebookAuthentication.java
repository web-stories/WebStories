package org.webstories.core.auth;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.integration.OAuth2Data;
import org.webstories.core.integration.OAuth2Token;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.integration.FacebookQueries;
import org.webstories.dao.invitation.InviteEntity;
import org.webstories.dao.invitation.InviteQueries;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.types.User;

@Stateless
public class FacebookAuthentication implements LocalFacebookAuthentication {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	FacebookQueries facebookQueries;
	
	@EJB
	InviteQueries inviteQueries;
	
	@Override
	public Logged authenticate( OAuth2Token token, OAuth2Data data )
	throws AuthenticationException {
		FacebookClient client = new DefaultFacebookClient( token.getAccessToken() );
		User facebookUser = client.fetchObject( "me", User.class );
		String facebookEmail = facebookUser.getEmail();
		String facebookId = facebookUser.getId();
		
		// If the user is already registered, then just log in, no additional check is required
		FacebookEntity facebookEntity = facebookQueries.findByFacebookId( facebookId );
		if ( facebookEntity != null ) {
			return Logged.from( facebookEntity );
		}
		
		InviteEntity invite = inviteQueries.findByInviteCode( data.getInviteCode() );
		if ( invite == null ) {
			throw new AuthenticationException( "Invalid invitation code: " + data.getInviteCode() );
		}
		
		// If the user refused to share the e-mail this field will be null
		if ( facebookEmail == null ) {
			throw new AuthenticationException( "E-mail not available" );
		}
		
		if ( !facebookEmail.equals( invite.getEmail() ) ) {
			throw new AuthenticationException( "E-mail does not match invitation" );
		}
		
		FacebookEntity facebook = new FacebookEntity();
		facebook.setFacebookId( facebookUser.getId() );
		facebook.setEmail( facebookUser.getEmail() );
		facebook.setFirstName( facebookUser.getFirstName() );
		facebook.setLastName( facebookUser.getLastName() );
		
		// Populate the Id
		entityManager.persist( facebook );
		
		return Logged.from( facebook );
	}
}
