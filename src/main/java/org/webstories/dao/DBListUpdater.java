package org.webstories.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;

import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;

/**
 * Systematically updates a "numerable" list for Create, Update and Delete operations.<br>
 * If a modified item does not exist in the persistent items, create a new record in the db.<br>
 * If a modified item exists in the persistent items, updates the record in the db.<br>
 * If a persistent item does not exist in the modified items, remove the record from the db.
 */
public abstract class DBListUpdater<M extends NumerableEntity, P extends NumerableEntity> {
	private List<M> modifiedItems;
	private List<P> persistentItems;
	
	public DBListUpdater( List<M> modifiedItems, List<P> persistentItems ) {
		this.modifiedItems = modifiedItems;
		this.persistentItems = persistentItems;
	}
	
	/**
	 * Update all items in the database.
	 * 
	 * @return  The managed instance of all items that the state was merged to. Removed items are
	 *          ignored
	 */
	public synchronized List<P> update( EntityManager entityManager ) {
		List<P> result = new ArrayList<P>();
		List<P> itemsLeft = new ArrayList<P>( persistentItems );
		
		// Add or update each modified item, removing from the persistent list
		for ( M modified : modifiedItems ) {
			P persistent;
			if ( modified.getId() == null ) {
				persistent = create( modified );
				entityManager.persist( persistent );
			} else {
				persistent = find( modified.getId(), itemsLeft );
				update( modified, persistent );
				persistent = entityManager.merge( persistent );
			}
			result.add( persistent );
			itemsLeft.remove( persistent );
		}
		
		// Remove leftovers from the database
		for ( P removed : itemsLeft ) {
			entityManager.remove( removed );
		}
		
		return result;
	}
	
	private P find( final long id, List<P> items ) {
		Iterator<P> iterator = Iterables.filter( items, new Predicate<P>() {
			@Override
			public boolean apply( P input ) {
				return input.getId().equals( id );
			}
		}).iterator();
		if ( iterator.hasNext() ) {
			return iterator.next();
		}
		throw new RuntimeException( "Failed to update entity, id not found: " + id );
	}
	
	/**
	 * Create the persistent object according to the data of the modified object.<br>
	 * 
	 * @return  The object to be persisted into the database
	 */
	protected abstract P create( M modified );
	
	/**
	 * Update the persistent object according to the data of the modified object.<br>
	 */
	protected abstract void update( M modified, P persistent );
}
