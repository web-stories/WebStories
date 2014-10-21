package org.webstories.core.security;

public interface PrivilegedUpdate<T> {
	void run( T object );
}
