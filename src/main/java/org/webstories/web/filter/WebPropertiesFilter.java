package org.webstories.web.filter;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

import org.webstories.core.resources.ApplicationProperties;
import org.webstories.core.resources.LocalApplicationPropertiesReader;
import org.webstories.core.resources.PropertiesException;

@WebFilter( filterName = "application-properties" )
public class WebPropertiesFilter implements Filter {
	@EJB
	LocalApplicationPropertiesReader reader;
	
	@Override
	public void init( FilterConfig filterConfig ) {}
	@Override
	public void doFilter( ServletRequest request, ServletResponse response, FilterChain chain )
	throws IOException, ServletException {
		try {
			ApplicationProperties applicationProps = reader.readApplicationProperties();
			request.setAttribute( "application", applicationProps );
		} catch ( PropertiesException e ) {
			throw new ServletException( e );
		}
		chain.doFilter( request, response );
	}
	@Override
	public void destroy() {}
}
