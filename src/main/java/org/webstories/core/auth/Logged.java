package org.webstories.core.auth;

import java.io.Serializable;

import org.webstories.core.user.PersonName;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.user.UserEntity;

public class Logged implements Serializable {
	private static final long serialVersionUID = 1;
	private Long id;
	private String fullName;
	private String firstName;
	private String lastName;
	private Logged( long id, PersonName name ) {
		this.id = id;
		this.firstName = name.getFirst();
		this.lastName = name.getLast();
		this.fullName = name.toString();
	}
	public static Logged from( UserEntity user ) {
		return from( user.getFacebook() );
	}
	public static Logged from( FacebookEntity facebook ) {
		long id = facebook.getId();
		PersonName name = PersonName.from( facebook );
		return new Logged( id, name );
	}
	public Long getId() {
		return id;
	}
	public String getFullName() {
		return fullName;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
}
