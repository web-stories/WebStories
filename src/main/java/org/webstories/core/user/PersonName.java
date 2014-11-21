package org.webstories.core.user;

import org.webstories.dao.IdentifiableEntity;

import com.restfb.types.User;

public class PersonName {
	private String firstName;
	private String lastName;
	
	protected PersonName( String firstName, String lastName ) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	
	public static PersonName from( String firstName, String lastName ) {
		return new PersonName( firstName, lastName );
	}
	public static PersonName from( String firstName ) {
		return from( firstName, "" );
	}
	public static PersonName from( User facebookUser ) {
		String firstName = facebookUser.getFirstName();
		String lastName = facebookUser.getLastName();
		return from( firstName, lastName );
	}
	public static PersonName from( IdentifiableEntity identifiable ) {
		String firstName = identifiable.getFirstName();
		String lastName = identifiable.getLastName();
		return from( firstName, lastName );
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
