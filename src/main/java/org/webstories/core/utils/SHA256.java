package org.webstories.core.utils;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Hex;

public class SHA256 {
	/**
	 * Encrypt assuming input as UTF-8
	 */
	public static String encrypt( String input ) throws SHA256Exception {
		try {
			byte[] bytes = input.getBytes( StandardCharsets.UTF_8.name() );
			return encrypt( bytes );
		} catch ( UnsupportedEncodingException e ) {
			throw new SHA256Exception();
		}
	}
	/**
	 * Encrypt a given array of bytes
	 */
	public static String encrypt( byte[] inputBytes ) throws SHA256Exception {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance( "SHA-256" );
			byte[] encodedBytes = messageDigest.digest( inputBytes );
			char[] encodedChars = Hex.encodeHex( encodedBytes );
			return String.valueOf( encodedChars );
		} catch ( NoSuchAlgorithmException e ) {
			throw new SHA256Exception();
		}
	}
}
