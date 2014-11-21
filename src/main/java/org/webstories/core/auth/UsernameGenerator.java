package org.webstories.core.auth;

import java.text.Normalizer;
import java.text.Normalizer.Form;

import org.webstories.core.user.PersonName;

public class UsernameGenerator {
	private CurrentUsername current;
	private PersonName name;
	public UsernameGenerator( PersonName name ) {
		this.name = name;
	}
	public String next() {
		if ( this.current == null ) {
			String username = name.toString();
			username = username.toLowerCase();
			username = username.replace( " ", "." );
			username = normalize( username );
			this.current = new CurrentUsername( username );
		} else {
			this.current.increase();
		}
		return this.current.toString();
	}
	public String getCurrent() {
		return current.toString();
	}
	/**
	 * Remove accents: http://stackoverflow.com/a/5697575/1400037
	 */
	private String normalize( String input ) {
		input = Normalizer.normalize( input, Form.NFD );
		input = input.replaceAll( "\\p{Block=CombiningDiacriticalMarks}", "" );
		return input;
	}
	private class CurrentUsername {
		private String username;
		private long count = 0;
		private CurrentUsername( String username ) {
			this.username = username;
		}
		private void increase() {
			this.count += 1;
		}
		@Override
		public String toString() {
			return count == 0 ? username : username + count;
		}
	}
}
