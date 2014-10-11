package org.webstories.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

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
			P persistent = createPersistent( modified );
			P merged = entityManager.merge( persistent );
			result.add( merged );
			itemsLeft.remove( persistent );
		}
		
		// Remove leftovers from the database
		for ( P removed : itemsLeft ) {
			entityManager.remove( removed );
		}
		
		return result;
	}
	
	/**
	 * Create the persistent object according to the data of the modified object.<br>
	 * 
	 * @return  The object to be merged into the database
	 */
	protected abstract P createPersistent( M modified );
}
