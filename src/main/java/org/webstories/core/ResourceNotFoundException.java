package org.webstories.core;

@SuppressWarnings( "serial" )
public class ResourceNotFoundException extends Exception {
	public ResourceNotFoundException( String msg ) {
		super( msg );
	}
}
