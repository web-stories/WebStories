package org.webstories.dao.user;

import javax.ejb.Stateless;

import org.webstories.dao.Queries;

import com.mysema.query.jpa.impl.JPAQuery;

@Stateless
public class UserQueries extends Queries {
	public UserEntity findByPrimaryKey( long primaryKey ) {
		return entityManager.find( UserEntity.class, primaryKey );
	}
	public UserEntity findByUsername( String username ) {
		QUserEntity tableUser = QUserEntity.userEntity;
		JPAQuery query = queryFrom( tableUser ).where(
			tableUser.ds_username.eq( username )
		);
		return query.singleResult( tableUser );
	}
	public boolean exists( String username ) {
		QUserEntity tableUser = QUserEntity.userEntity;
		JPAQuery query = queryFrom( tableUser ).where(
			tableUser.ds_username.eq( username )
		);
		return query.exists();
	}
}
