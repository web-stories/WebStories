package org.webstories.core.auth;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.activity.LocalActivityRegistrator;
import org.webstories.core.integration.OAuth2Data;
import org.webstories.core.integration.OAuth2Token;
import org.webstories.core.logging.LocalAppLogger;
import org.webstories.core.user.PersonName;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.integration.FacebookQueries;
import org.webstories.dao.invitation.InviteEntity;
import org.webstories.dao.invitation.InviteQueries;
import org.webstories.dao.user.UserEntity;
import org.webstories.dao.user.UserQueries;

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
	UserQueries userQueries;
	
	@EJB
	InviteQueries inviteQueries;
	
	@EJB
	LocalDefaultAuthentication authentication;
	
	@EJB
	LocalActivityRegistrator activityRegistrator;
	
	@EJB
	LocalAppLogger logger;
	
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
		
		if ( data.getInviteCode() == null ) {
			throw new AuthenticationException( "Invitation code is empty" );
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
			throw new AuthenticationException(
				"E-mail does not match invitation: " + invite.getEmail()
			);
		}
		
		// Register user
		PersonName name = PersonName.from( facebookUser );
		long idUser = authentication.register( name );
		UserEntity webstoriesUser = userQueries.findByPrimaryKey( idUser );
		String profileURL = facebookUser.getLink();
		
		FacebookEntity facebook =
			FacebookEntity.from( name, facebookEmail, facebookId, webstoriesUser, profileURL );
		entityManager.persist( facebook );
		
		Logged logged = Logged.from( facebook );
		
		try {
			activityRegistrator.registerJoinedActivity( logged );
		} catch ( UserNotLoggedException e ) {
			logger.logInternal( e );
		}
		
		return logged;
	}
}
