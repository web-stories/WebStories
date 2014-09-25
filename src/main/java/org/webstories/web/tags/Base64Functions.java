package org.webstories.web.tags;

import org.webstories.core.utils.Base64;

public class Base64Functions {
	public static String encode( String plain ) {
		return Base64.encode( plain );
	}
}
