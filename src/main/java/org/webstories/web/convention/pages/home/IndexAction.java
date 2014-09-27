package org.webstories.web.convention.pages.home;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@ConventionServlet
@AuthForwarded
public class IndexAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
	throws IOException {
		// If user has no story...
		request.setAttribute( "nostory", true );
	}
}
