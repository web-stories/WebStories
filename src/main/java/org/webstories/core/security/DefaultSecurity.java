package org.webstories.core.security;


public abstract class DefaultSecurity<T> implements UpdateSecurity<T>, ReadSecurity<T> {
	@Override
	public T readPrivileged( PrivilegedRead<T> read ) throws AccessDeniedException {
		T object = read.run();
		if ( !isAccessible( object ) ) {
			throw new AccessDeniedException();
		}
		return object;
	}
	@Override
	public void updatePrivileged( PrivilegedRead<T> read, PrivilegedUpdate<T> update )
	throws AccessDeniedException {
		T object = read.run();
		if ( !isAccessible( object ) ) {
			throw new AccessDeniedException();
		}
		update.run( object );
	}
}
