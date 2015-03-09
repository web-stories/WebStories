package org.webstories.web.convention.pages.home.user;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class InvitesAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {}
}
