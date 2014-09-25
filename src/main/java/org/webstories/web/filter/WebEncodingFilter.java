package org.webstories.web.filter;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter( filterName = "encoding" )
public class WebEncodingFilter implements Filter {
	private final Charset UTF_8 = StandardCharsets.UTF_8;
	@Override
	public void init( FilterConfig filterConfig ) throws ServletException {}
	@Override
	public void doFilter( ServletRequest req, ServletResponse response, FilterChain chain )
	throws IOException, ServletException {
		HttpServletRequest request = ( HttpServletRequest )req;
		
		response.setCharacterEncoding( UTF_8.name() ); // Server's output
		request.setCharacterEncoding( UTF_8.name() ); // Input of parameters sent by the client
		
		chain.doFilter( request, response );
	}
	@Override
	public void destroy() {}
}
