package org.webstories.core.security;

public interface SecurityConstraint<T> {
	boolean isAccessible( T object );
}
