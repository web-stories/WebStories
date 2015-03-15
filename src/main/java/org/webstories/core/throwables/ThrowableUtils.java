package org.webstories.core.throwables;

public class ThrowableUtils {
	public static Throwable findRootCauseWithMessage( Throwable e ) {
		Throwable current = e;
		
		// Iterate over all causes to find the closest message to the root cause
		while ( current.getCause() != null && current.getCause().getMessage() != null ) {
			current = current.getCause();
		}
		
		return current;
	}
}
