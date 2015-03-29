package org.webstories.web.convention.pages.error;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.servlet.ErrorServlet;

@WebServlet
@SuppressWarnings( "serial" )
public class SC500Action extends ErrorServlet {
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {}
}
