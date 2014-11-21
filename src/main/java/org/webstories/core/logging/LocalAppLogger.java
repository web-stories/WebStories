package org.webstories.core.logging;

import javax.ejb.Local;
import javax.servlet.http.HttpServletRequest;

import org.webstories.core.auth.Logged;

@Local
public interface LocalAppLogger {
	void logAccess( Logged logged, HttpServletRequest request, Throwable e );
}
