package org.webstories.dao.user;

import javax.ejb.Stateless;

import org.webstories.dao.Queries;

@Stateless
public class UserQueries extends Queries {
	public UserEntity findByPrimaryKey( long primaryKey ) {
		return entityManager.find( UserEntity.class, primaryKey );
	}
}
