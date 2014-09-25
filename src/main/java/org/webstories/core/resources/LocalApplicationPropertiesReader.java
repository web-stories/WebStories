package org.webstories.core.resources;

import javax.ejb.Local;

@Local
public interface LocalApplicationPropertiesReader {
	/**
	 * Create an object representing the data inside an <code>application.properties</code> file in
	 * the classpath
	 */
	ApplicationProperties readApplicationProperties() throws PropertiesException;
}
