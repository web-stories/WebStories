package org.webstories.core.utils;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ExceptionUtils {
	/**
	 * @return  The stacktrace of the throwable object as string
	 */
	public static String toString( Throwable e ) {
		StringWriter writer = new StringWriter();
		e.printStackTrace( new PrintWriter( writer ) );
		return writer.toString();
	}
	/**
	 * Attempts to get the cause of the given throwable. If the cause cannot be retrieved, throws
	 * an <code>EmptyCauseException</code>
	 */
	public static Throwable getCause( Throwable e ) throws EmptyCauseException {
		Throwable cause = e.getCause();
		if ( cause == null ) {
			throw new EmptyCauseException();
		}
		return cause;
	}
	
	public static class EmptyCauseException extends Exception {
		private static final long serialVersionUID = 1;
	}
}
