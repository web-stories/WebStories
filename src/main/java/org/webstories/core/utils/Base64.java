package org.webstories.core.utils;

import java.nio.charset.StandardCharsets;

public class Base64 {
	/**
	 * Encode using UTF-8 for all string operations
	 */
	public static String encode( String plain ) {
		byte[] string = plain.getBytes( StandardCharsets.UTF_8 );
		byte[] encodedBytes = org.apache.commons.codec.binary.Base64.encodeBase64( string );
		return new String( encodedBytes, StandardCharsets.UTF_8 );
	}
	/**
	 * Decode into a UTF-8 encoded string
	 */
	public static String decode( String encoded ) {
		byte[] decodedBytes = org.apache.commons.codec.binary.Base64.decodeBase64( encoded );
		return new String( decodedBytes, StandardCharsets.UTF_8 );
	}
}
