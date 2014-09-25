package org.webstories.web.tags;


public class URLFunctions {
	public static String buildURI( String uri, String queryString ) {
		if ( queryString.isEmpty() ) {
			return uri;
		}
		return uri + "?" + queryString;
	}
}
