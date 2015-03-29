package org.webstories.web.convention.pages;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.web.IndividualPageSEO;
import org.webstories.web.util.servlet.BaseServlet;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@SuppressWarnings( "serial" )
public class AboutAction extends BaseServlet {
	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response ) {
		request.setAttribute( "seo", new IndividualPageSEO
			.Builder()
				.title( "Sobre Web Stories" )
			.build()
		);
	};
}
