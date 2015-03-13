package org.webstories.dao.invitation;

import java.util.List;

import javax.ejb.Stateless;

import org.webstories.dao.Queries;

import com.mysema.query.jpa.impl.JPAQuery;

@Stateless
public class InviteQueries extends Queries {
	public boolean exists( String inviteCode ) {
		QInviteEntity tableInvite = QInviteEntity.inviteEntity;
		JPAQuery query = queryFrom( tableInvite ).where(
			tableInvite.cod_invite.eq( inviteCode )
		);
		return query.exists();
	}
	public InviteEntity findByInviteCode( String inviteCode ) {
		QInviteEntity tableInvite = QInviteEntity.inviteEntity;
		JPAQuery query = queryFrom( tableInvite ).where(
			tableInvite.cod_invite.eq( inviteCode )
		);
		return query.singleResult( tableInvite );
	}
	public List<InviteEntity> findAvailableInvitations( long idUser ) {
		QInviteEntity tableInvite = QInviteEntity.inviteEntity;
		JPAQuery query = queryFrom( tableInvite ).where(
			tableInvite.ds_email.isNull().and(
				tableInvite.inviter.id_user.eq( idUser )
			)
		);
		return query.list( tableInvite );
	}
	public List<InviteEntity> findUsedInvitations( long idUser ) {
		QInviteEntity tableInvite = QInviteEntity.inviteEntity;
		JPAQuery query = queryFrom( tableInvite ).where(
			tableInvite.inviter.id_user.eq( idUser )
		)
		// When someone accepts an invitation it may change order, so be consistent.
		.orderBy( tableInvite.id_invite.desc() );
		return query.list( tableInvite );
	}
}
