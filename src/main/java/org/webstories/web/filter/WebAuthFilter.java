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

import org.webstories.core.auth.AuthSession;
import org.webstories.core.auth.Logged;
import org.webstories.core.auth.http.BasicAuthData;
import org.webstories.core.auth.http.LocalHttpAuthentication;
import org.webstories.web.util.servlet.AuthForwarded;

import com.fagnerbrack.servlet.convention.ConventionServletRequest;

@WebFilter( filterName = "auth" )
public class WebAuthFilter implements Filter {
	@EJB
	LocalHttpAuthentication httpAuthentication;
	
	@Override
	public void init( FilterConfig filterConfig ) {}
	
	@Override
	public void doFilter( ServletRequest req, ServletResponse response, FilterChain chain )
	throws IOException, ServletException {
		HttpServletRequest request = ( HttpServletRequest )req;
		AuthSession session = AuthSession.from( request );
		ConventionServletRequest convention = new ConventionServletRequest( request );
		BasicAuthenticationMode basic = new BasicAuthenticationMode( request );
		ForwardAuthenticationMode forward = new ForwardAuthenticationMode( convention, session );
		
		if ( basic.isAvailable() ) {
			BasicAuthData data = BasicAuthData.from( basic.getAuthorizationHeader() );
			Logged logged = httpAuthentication.basic( data );
			session.setLogged( logged );
			chain.doFilter( request, response );
			return;
		}
		
		if ( forward.isAvailable() ) {
			request
				.getRequestDispatcher( "/identification/auth" )
				.forward( request, response );
			return;
		}
		
		chain.doFilter( request, response );
	}
	
	@Override
	public void destroy() {}
}

abstract class AuthenticationMode {
	protected abstract boolean isAvailable();
}

class ForwardAuthenticationMode extends AuthenticationMode {
	private ConventionServletRequest request;
	private AuthSession session;
	protected ForwardAuthenticationMode( ConventionServletRequest request, AuthSession session ) {
		this.request = request;
		this.session = session;
	}
	@Override
	protected boolean isAvailable() {
		Class<?> actionClass = request.getActionClass();
		
		// Requires a valid convention action
		if ( actionClass == null ) {
			return false;
		}
		
		// Requires the proper annotation for the request to be forwarded
		if ( !actionClass.isAnnotationPresent( AuthForwarded.class ) ) {
			return false;
		}
		
		// If user is logged do nothing
		if ( session.isLogged() ) {
			return false;
		}
		
		return true;
	}
}

class BasicAuthenticationMode extends AuthenticationMode {
	private String authorization;
	protected BasicAuthenticationMode( HttpServletRequest request ) {
		this.authorization = request.getHeader( "Authorization" );
	}
	@Override
	protected boolean isAvailable() {
		return authorization != null;
	}
	protected String getAuthorizationHeader() {
		return authorization;
	}
}
