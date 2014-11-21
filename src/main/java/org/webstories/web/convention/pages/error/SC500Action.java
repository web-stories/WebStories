package org.webstories.web.convention.pages.error;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.servlet.ErrorServlet;

@WebServlet
public class SC500Action extends ErrorServlet {
	private static final long serialVersionUID = 1;
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {}
}
