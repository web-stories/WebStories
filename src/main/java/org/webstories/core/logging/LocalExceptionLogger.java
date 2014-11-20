package org.webstories.core.logging;

import javax.ejb.Local;

import org.webstories.core.auth.Logged;

@Local
public interface LocalExceptionLogger {
	void logAccessException( Logged logged, Throwable e );
}
