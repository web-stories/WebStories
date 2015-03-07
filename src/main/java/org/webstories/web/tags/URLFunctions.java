package org.webstories.web.tags;


public class URLFunctions {
	public static String concatQuery( String uri, String queryString ) {
		if ( queryString.isEmpty() ) {
			return uri;
		}
		return uri + "?" + queryString;
	}
}
