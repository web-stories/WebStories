package org.webstories.web.filter;

import java.io.IOException;
import java.io.InputStream;
import java.util.jar.Attributes;
import java.util.jar.Manifest;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter( filterName = "resources-folder" )
public class WebResourcesFolder implements Filter {
	@Override
	public void init( FilterConfig filterConfig ) throws ServletException {}
	@Override
	public void doFilter( ServletRequest req, ServletResponse response, FilterChain chain )
	throws IOException, ServletException {
		HttpServletRequest request = ( HttpServletRequest )req;
		String build = getManifestAttr( "Build-Revision", request );
		String requestURI = request.getRequestURI();
		String staticFolder = request.getContextPath() + "/static";
		String buildFolder = staticFolder + "/" + build;
		
		request.setAttribute( "build", build );
		
		if ( !requestURI.startsWith( buildFolder ) ) {
			chain.doFilter( request, response );
			return;
		}
		
		String rBuildFolder = Pattern.quote( buildFolder );
		String forward = requestURI.replaceFirst( rBuildFolder, staticFolder );
		request
			.getRequestDispatcher( forward )
			.forward( request, response );
	}
	@Override
	public void destroy() {}
	private String getManifestAttr( String key, HttpServletRequest request ) throws IOException {
		ServletContext context = request.getServletContext();
		InputStream input = context.getResourceAsStream( "/WEB-INF/classes/META-INF/MANIFEST.MF" );
		Manifest manifest = new Manifest( input );
		Attributes attributes = manifest.getMainAttributes();
		return attributes.getValue( key );
	}
}
