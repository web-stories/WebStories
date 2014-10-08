package org.webstories.core.auth;

import java.text.Normalizer;
import java.text.Normalizer.Form;

public class UsernameGenerator {
	private String current = null;
	private PersonName name;
	private long nextCount = 0;
	public UsernameGenerator( PersonName name ) {
		this.name = name;
	}
	public String next() {
		if ( this.current == null ) {
			this.current = createUsername();
		} else {
			this.current = this.current + ++nextCount;
		}
		return this.current;
	}
	public String getCurrent() {
		return current;
	}
	private String createUsername() {
		String result = name.toString();
		result = result.toLowerCase();
		result = result.replace( " ", "." );
		return normalize( result );
	}
	/**
	 * Remove accents: http://stackoverflow.com/a/5697575/1400037
	 */
	private String normalize( String input ) {
		input = Normalizer.normalize( input, Form.NFD );
		input = input.replaceAll( "\\p{Block=CombiningDiacriticalMarks}", "" );
		return input;
	}
}
