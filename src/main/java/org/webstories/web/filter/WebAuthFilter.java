package org.webstories.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.webstories.web.util.servlet.AuthForwarded;

import com.fagnerbrack.servlet.convention.ConventionServletRequest;

@WebFilter( filterName = "auth" )
public class WebAuthFilter implements Filter {
	@Override
	public void init( FilterConfig filterConfig ) {}
	@Override
	public void doFilter( ServletRequest req, ServletResponse response, FilterChain chain )
	throws IOException, ServletException {
		HttpServletRequest request = ( HttpServletRequest )req;
		HttpSession session = request.getSession();
		Class<?> actionClass = new ConventionServletRequest( request ).getActionClass();
		
		// Requires a valid convention action
		if ( actionClass == null ) {
			chain.doFilter( request, response );
			return;
		}
		
		// Requires the proper annotation for the request to be forwarded
		if ( !actionClass.isAnnotationPresent( AuthForwarded.class ) ) {
			chain.doFilter( request, response );
			return;
		}
		
		// If user is logged do nothing
		if ( Boolean.TRUE.equals( session.getAttribute( "isLogged" ) ) ) {
			chain.doFilter( request, response );
			return;
		}
		
		request
			.getRequestDispatcher( "/identification/auth" )
			.forward( request, response );
	}
	@Override
	public void destroy() {}
}
