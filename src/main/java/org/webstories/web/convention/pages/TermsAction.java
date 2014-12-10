package org.webstories.web.convention.pages;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
public class TermsAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {};
}
