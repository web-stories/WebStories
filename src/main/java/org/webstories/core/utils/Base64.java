package org.webstories.core.utils;

import java.nio.charset.StandardCharsets;

public class Base64 {
	/**
	 * Faz o encode em Base64 de uma string.<br>
	 * Utiliza o charset UTF-8 para todas as operações com os bytes da string.
	 */
	public static String encode( String plain ) {
		byte[] string = plain.getBytes( StandardCharsets.UTF_8 );
		byte[] encodedBytes = org.apache.commons.codec.binary.Base64.encodeBase64( string );
		return new String( encodedBytes, StandardCharsets.UTF_8 );
	}
	/**
	 * Faz o decode de uma string previamente codificada em Base64.<br>
	 * Utiliza o charset UTF-8 para a criação do valor decodificado
	 */
	public static String decode( String encoded ) {
		byte[] decodedBytes = org.apache.commons.codec.binary.Base64.decodeBase64( encoded );
		return new String( decodedBytes, StandardCharsets.UTF_8 );
	}
}
