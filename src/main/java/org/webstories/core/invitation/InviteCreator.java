package org.webstories.core.invitation;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.logging.LocalAppLogger;
import org.webstories.core.utils.SHA256Exception;
import org.webstories.dao.invitation.InviteEntity;
import org.webstories.dao.user.UserEntity;

@Stateless
public class InviteCreator implements LocalInviteCreator {
	@PersistenceContext
	EntityManager entityManager;
	
	@EJB
	LocalAppLogger appLogger;
	
	@Override
	public void increaseUserInvitations( long idUser ) {
		UserEntity inviter = entityManager.find( UserEntity.class, idUser );
		for ( int i = 0; i < 5; i++ ) {
			try {
				InviteEntity invite = InviteEntity.create( inviter );
				entityManager.persist( invite );
			} catch ( SHA256Exception e ) {
				appLogger.logInternal( e );
			}
		}
	}
}
