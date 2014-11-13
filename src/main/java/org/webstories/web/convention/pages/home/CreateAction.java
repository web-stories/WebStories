package org.webstories.web.convention.pages.home;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.webstories.core.auth.Logged;
import org.webstories.core.story.editor.EditorStoryDetailsInput;
import org.webstories.core.story.facade.LocalStoryCreator;
import org.webstories.core.validation.ValidationException;
import org.webstories.web.util.params.RequestParams;
import org.webstories.web.util.servlet.AuthForwarded;
import org.webstories.web.util.servlet.BaseServlet;
import org.webstories.web.util.servlet.HttpInternalServerErrorException;

import com.fagnerbrack.servlet.convention.ConventionServlet;

@WebServlet
@ConventionServlet
@AuthForwarded
public class CreateAction extends BaseServlet {
	private static final long serialVersionUID = 1;
	
	@EJB
	LocalStoryCreator creator;
	
	@Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response )
	throws HttpInternalServerErrorException, IOException {
		RequestParams params = RequestParams.from( request );
		Logged logged = getLogged( request );
		EditorStoryDetailsInput input = EditorStoryDetailsInput.from( params );
		try {
			creator.createMeta( input, logged );
			response.sendRedirect( request.getHeader( "referer" ) );
		} catch ( ValidationException | IOException e ) {
			throw new HttpInternalServerErrorException( e );
		}
	}
}
