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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;
import org.webstories.core.auth.http.BasicAuthData;
import org.webstories.core.auth.http.LocalHttpAuthentication;
import org.webstories.web.util.servlet.AuthForwarded;

import com.fagnerbrack.servlet.convention.ConventionServletRequest;

@WebFilter( filterName = "auth" )
public class WebAuthFilter implements Filter {
	@EJB
	LocalHttpAuthentication authentication;
	
	@Override
	public void init( FilterConfig filterConfig ) {}
	@Override
	public void doFilter( ServletRequest req, ServletResponse response, FilterChain chain )
	throws IOException, ServletException {
		HttpServletRequest request = ( HttpServletRequest )req;
		String authorization = request.getHeader( "Authorization" );
		
		if ( authorization != null ) {
			BasicAuthData extractor = BasicAuthData.from( authorization );
			Logged logged = authentication.basic( extractor );
			AuthSession.from( request ).setLogged( logged );
		}
		
		if ( isForwardable( request ) ) {
			request
				.getRequestDispatcher( "/identification/auth" )
				.forward( request, response );
			return;
		}
		
		chain.doFilter( request, response );
	}
	@Override
	public void destroy() {}
	
	private boolean isForwardable( HttpServletRequest request ) {
		HttpSession session = request.getSession();
		Class<?> actionClass = new ConventionServletRequest( request ).getActionClass();
		
		// Requires a valid convention action
		if ( actionClass == null ) {
			return false;
		}
		
		// Requires the proper annotation for the request to be forwarded
		if ( !actionClass.isAnnotationPresent( AuthForwarded.class ) ) {
			return false;
		}
		
		// If user is logged do nothing
		if ( Boolean.TRUE.equals( session.getAttribute( "isLogged" ) ) ) {
			return false;
		}
		
		return true;
	}
}
