package org.webstories.core.auth;

import org.webstories.dao.integration.FacebookEntity;

import com.restfb.types.User;

public class PersonName {
	private String firstName;
	private String lastName;
	private PersonName( String firstName, String lastName ) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	public static PersonName from( User facebookUser ) {
		String firstName = facebookUser.getFirstName();
		String lastName = facebookUser.getLastName();
		return from( firstName, lastName );
	}
	public static PersonName from( FacebookEntity facebook ) {
		String firstName = facebook.getFirstName();
		String lastName = facebook.getLastName();
		return from( firstName, lastName );
	}
	public static PersonName from( String firstName ) {
		return from( firstName, "" );
	}
	public static PersonName from( String firstName, String lastName ) {
		return new PersonName( firstName, lastName );
	}
	public String getFirst() {
		return firstName;
	}
	public String getLast() {
		return lastName;
	}
	@Override
	public String toString() {
		return ( firstName + " " + lastName ).trim();
	}
}
