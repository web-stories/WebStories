package org.webstories.core.security;

public interface UpdateSecurity<T> extends SecurityConstraint<T> {
	void updatePrivileged( PrivilegedRead<T> read, PrivilegedUpdate<T> update )
		throws AccessDeniedException;
}
