package org.webstories.core.auth;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.activity.LocalActivityRegistrator;
import org.webstories.core.integration.OAuth2Data;
import org.webstories.core.integration.OAuth2Token;
import org.webstories.core.invitation.LocalInviteCreator;
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
	LocalInviteCreator inviteCreator;
	
	@EJB
	LocalAppLogger logger;
	
	@Override
	public Logged authenticate( OAuth2Token token, OAuth2Data data )
	throws FacebookAuthenticationException {
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
			throw new FacebookAuthenticationException( "O convite está vazio" );
		}
		
		InviteEntity invite = inviteQueries.findByInviteCode( data.getInviteCode() );
		if ( invite == null ) {
			throw new FacebookAuthenticationException(
				"Este convite não existe: " + data.getInviteCode()
			);
		}
		
		// If the user refused to share the e-mail, this field will be null
		if ( facebookEmail == null ) {
			throw new FacebookAuthenticationException(
				"É necessário que você compartilhe o endereço de e-mail do Facebook"
			);
		}
		
		// If the invitation does not contain an e-mail, then it means the invitation was not
		// previously reserved
		if ( invite.getEmail() == null ) {
			invite.setEmail( facebookEmail );
		}
		
		if ( !facebookEmail.equals( invite.getEmail() ) ) {
			// Log both e-mails in case the user informs the e-mail with something different.
			// A situation happened when the user informed the e-mail manually for invitation, but
			// it was typed in a smartphone, then the first letter was uppercased, causing this
			// exception to be thrown on registration.
			throw new FacebookEmailMatchingException( invite.getEmail(), facebookEmail );
		}
		
		// Register user
		PersonName name = PersonName.from( facebookUser );
		long idUser;
		
		try {
			idUser = authentication.register( name );
		} catch ( AuthenticationException e ) {
			throw new FacebookAuthenticationException( e );
		}
		
		UserEntity webstoriesUser = userQueries.findByPrimaryKey( idUser );
		String profileURL = facebookUser.getLink();
		
		invite.setInvited( webstoriesUser );
		
		FacebookEntity facebook =
			FacebookEntity.from( name, facebookEmail, facebookId, webstoriesUser, profileURL );
		entityManager.persist( facebook );
		
		Logged logged = Logged.from( facebook );
		
		activityRegistrator.registerJoinedActivity( logged );
		inviteCreator.increaseUserInvitations( idUser );
		
		return logged;
	}
}
