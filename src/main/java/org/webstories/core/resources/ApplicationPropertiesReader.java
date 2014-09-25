package org.webstories.core.resources;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.ejb.EJB;
import javax.ejb.Stateless;

@Stateless
public class ApplicationPropertiesReader implements LocalApplicationPropertiesReader {
	@EJB
	ResourceReader reader;
	
	@Override
	public ApplicationProperties readApplicationProperties() throws PropertiesException {
		try ( InputStream resource = reader.getResourceStream( "application.properties" ) ) {
			Properties properties = new Properties();
			properties.load( resource );
			return ApplicationProperties.from( properties );
		} catch ( IOException | ResourceNotFoundException e ) {
			throw new PropertiesException( e );
		}
	}
}
