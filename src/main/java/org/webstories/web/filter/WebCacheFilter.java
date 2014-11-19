package org.webstories.web.filter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.utils.SHA256;
import org.webstories.core.utils.SHA256Exception;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

import com.fagnerbrack.servlet.gzip.proxy.ProxiedServletResponse;

@WebFilter( filterName = "cache" )
public class WebCacheFilter implements Filter {
	@Override
	public void init( FilterConfig filterConfig ) throws ServletException {}
	
	@Override
	public void doFilter( ServletRequest req, ServletResponse res, FilterChain chain )
	throws IOException, ServletException {
		HttpServletRequest request = ( HttpServletRequest )req;
		HttpServletResponse response = ( HttpServletResponse )res;
		
		if ( !isCacheableRequest( request ) ) {
			chain.doFilter( request, response );
			return;
		}
		
		try {
			ByteArrayOutputStream stream = new ByteArrayOutputStream();
			ProxiedServletResponse proxy = new ProxiedServletResponse( response, stream );
			chain.doFilter( request, proxy );
			proxy.flushBuffer(); // Necessary to avoid keeping buffered bytes in memory
			byte[] content = stream.toByteArray();
			
			// This is done just to have control over ETag algorithm instead of relying in the
			// browser to do it.
			// All resources are cached using the file name to enable long cache-control headers.
			String resourceHash = SHA256.encrypt( content );
			response.setHeader( "ETag", resourceHash );
			if ( resourceHash.equals( request.getHeader( "If-None-Match" ) ) ) {
				response.sendError( HttpServletResponse.SC_NOT_MODIFIED );
				return;
			}
			
			// Send 1 year expiration because we handle vendor resources through versioning and
			// custom resources through a virtual directory.
			response.setHeader( "Cache-Control", "private, max-age=31536000" );
			
			response.getOutputStream().write( content );
		} catch ( SHA256Exception e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
	
	/**
	 * Check if this request represents a cacheable resource that may or may not be kept in the
	 * client's cache according to specific app caching rules.
	 */
	private boolean isCacheableRequest( HttpServletRequest request ) {
		String path = request.getRequestURI().substring( request.getContextPath().length() );
		return path.startsWith( "/static/" );
	}
	
	@Override
	public void destroy() {}
}
