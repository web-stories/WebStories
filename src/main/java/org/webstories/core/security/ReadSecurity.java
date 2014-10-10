package org.webstories.core.security;

public interface ReadSecurity<T> extends SecurityConstraint<T> {
	T readPrivileged( PrivilegedRead<T> read ) throws AccessDeniedException;
}
