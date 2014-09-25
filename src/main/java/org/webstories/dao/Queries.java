package org.webstories.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.EntityPath;

public abstract class Queries {
	@PersistenceContext
	protected EntityManager entityManager;
	
	protected JPAQuery queryFrom( EntityPath<?>... o ) {
		return new JPAQuery( entityManager ).from( o );
	}
}
