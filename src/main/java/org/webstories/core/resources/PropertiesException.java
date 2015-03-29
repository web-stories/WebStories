package org.webstories.core.resources;

@SuppressWarnings( "serial" )
public class PropertiesException extends Exception {
	public PropertiesException( String filename, Throwable cause ) {
		super( filename, cause );
	}
	public PropertiesException( Throwable cause ) {
		super( cause );
	}
}
