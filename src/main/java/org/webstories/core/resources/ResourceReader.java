package org.webstories.core.resources;

import java.io.InputStream;

import javax.ejb.Stateless;

@Stateless
public class ResourceReader {
	/**
	 * Get an application resource from the classpath.
	 * @return The stream representing the resource. This stream should be closed.
	 */
	public InputStream getResourceStream( String fileName ) throws ResourceNotFoundException {
		ClassLoader currentClassloader = this.getClass().getClassLoader();
		InputStream input = currentClassloader.getResourceAsStream( fileName );
		if ( input == null ) {
			throw new ResourceNotFoundException();
		}
		return input;
	}
}
