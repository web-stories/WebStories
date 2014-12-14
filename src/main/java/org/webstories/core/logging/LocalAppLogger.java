package org.webstories.core.logging;

import javax.ejb.Local;
import javax.servlet.http.HttpServletRequest;

import org.eclipse.jdt.annotation.Nullable;
import org.webstories.core.auth.Logged;

@Local
public interface LocalAppLogger {
	void logAccess( @Nullable Logged logged, HttpServletRequest request, @Nullable Throwable e );
	void logInternal( Throwable e );
}
