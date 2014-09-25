package org.webstories.dao.integration;

import javax.ejb.Stateless;

import org.webstories.dao.Queries;

import com.mysema.query.jpa.impl.JPAQuery;

@Stateless
public class FacebookQueries extends Queries {
	public FacebookEntity findByFacebookId( String facebookId ) {
		QFacebookEntity tableFacebook = QFacebookEntity.facebookEntity;
		JPAQuery query = queryFrom( tableFacebook ).where(
			tableFacebook.cod_uid.eq( facebookId )
		);
		return query.singleResult( tableFacebook );
	}
}
