package org.webstories.core;

public class ResourceNotFoundException extends Exception {
	private static final long serialVersionUID = 1;
	public ResourceNotFoundException( String msg ) {
		super( msg );
	}
}
