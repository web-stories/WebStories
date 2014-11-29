package org.webstories.core.resources;

public class PropertiesException extends Exception {
	private static final long serialVersionUID = 1;
	public PropertiesException( String filename, Throwable cause ) {
		super( filename, cause );
	}
	public PropertiesException( Throwable cause ) {
		super( cause );
	}
}
